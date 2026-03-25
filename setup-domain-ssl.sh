#!/bin/bash
# Talpro Domain Consolidation — SSL Setup Script
# Run this AFTER all DNS records point to 147.93.103.194
# Created: March 25, 2026

set -e

VPS_IP="147.93.103.194"
DOMAINS=(
    "talpro.in"
    "talpro.shop"
    "teamtalpro.com"
    "teamtalpro.in"
    "teamtalpro.online"
)

echo "=== Talpro Domain SSL Setup ==="
echo "VPS IP: $VPS_IP"
echo ""

# Step 1: Check DNS for all domains
echo "--- Step 1: DNS Verification ---"
ALL_DNS_OK=true
for domain in "${DOMAINS[@]}"; do
    resolved=$(dig +short A "$domain" 2>/dev/null | head -1)
    www_resolved=$(dig +short A "www.$domain" 2>/dev/null | head -1)
    
    if [ "$resolved" = "$VPS_IP" ]; then
        echo "  ✅ $domain -> $resolved"
    else
        echo "  ❌ $domain -> $resolved (expected $VPS_IP)"
        ALL_DNS_OK=false
    fi
    
    # www check (could be CNAME → root → IP)
    www_final=$(dig +short "www.$domain" 2>/dev/null | tail -1)
    if [ "$www_final" = "$VPS_IP" ] || [ "$www_final" = "$domain." ]; then
        echo "  ✅ www.$domain -> OK"
    else
        echo "  ⚠️  www.$domain -> $www_resolved (may need CNAME to $domain)"
    fi
done

if [ "$ALL_DNS_OK" = false ]; then
    echo ""
    echo "⚠️  Some domains don't point to $VPS_IP yet."
    echo "Fix DNS and re-run this script."
    read -p "Continue anyway for domains that ARE ready? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Step 2: Get SSL certificates
echo ""
echo "--- Step 2: SSL Certificate Generation ---"
for domain in "${DOMAINS[@]}"; do
    resolved=$(dig +short A "$domain" 2>/dev/null | head -1)
    if [ "$resolved" = "$VPS_IP" ]; then
        echo "Getting cert for $domain + www.$domain..."
        certbot certonly --nginx \
            -d "$domain" -d "www.$domain" \
            --non-interactive --agree-tos \
            --email bhaskar@talpro.in \
            --redirect \
            2>&1 | tail -3
        echo ""
    else
        echo "  ⏭️  Skipping $domain (DNS not ready)"
    fi
done

# Step 3: Update nginx config with SSL
echo ""
echo "--- Step 3: Updating nginx config with SSL ---"

# Build the SSL redirect config
cat > /etc/nginx/sites-available/talpro-domain-consolidation << 'NGINX_SSL_EOF'
# Talpro Domain Consolidation — 301 Redirects to talproindia.com
# Auto-generated with SSL support
# Created: March 25, 2026

# HTTP (Port 80) — Redirect all secondary domains to HTTPS canonical
server {
    listen 80;
    server_name
        talpro.in www.talpro.in
        talpro.shop www.talpro.shop
        teamtalpro.com www.teamtalpro.com
        teamtalpro.in www.teamtalpro.in
        teamtalpro.online www.teamtalpro.online;

    return 301 https://talproindia.com$request_uri;
}

NGINX_SSL_EOF

# Add HTTPS blocks for each domain that has a cert
for domain in "${DOMAINS[@]}"; do
    cert_path="/etc/letsencrypt/live/$domain/fullchain.pem"
    if [ -f "$cert_path" ]; then
        cat >> /etc/nginx/sites-available/talpro-domain-consolidation << NGINX_BLOCK
# HTTPS redirect for $domain
server {
    listen 443 ssl http2;
    server_name $domain www.$domain;

    ssl_certificate /etc/letsencrypt/live/$domain/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$domain/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    return 301 https://talproindia.com\$request_uri;
}

NGINX_BLOCK
        echo "  ✅ Added HTTPS block for $domain"
    else
        echo "  ⏭️  No cert for $domain yet"
    fi
done

# Step 4: Test and reload nginx
echo ""
echo "--- Step 4: Nginx Test & Reload ---"
nginx -t && systemctl reload nginx && echo "✅ Nginx reloaded successfully!"

# Step 5: Verify redirects
echo ""
echo "--- Step 5: Verification ---"
for domain in "${DOMAINS[@]}"; do
    for prefix in "" "www."; do
        url="https://${prefix}${domain}"
        status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$url" 2>/dev/null || echo "FAIL")
        location=$(curl -s -o /dev/null -w "%{redirect_url}" --max-time 5 "$url" 2>/dev/null || echo "FAIL")
        if [ "$status" = "301" ]; then
            echo "  ✅ $url -> 301 -> $location"
        else
            echo "  ❌ $url -> HTTP $status"
        fi
    done
done

echo ""
echo "=== Done! ==="
