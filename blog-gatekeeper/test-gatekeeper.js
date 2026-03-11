import fetch from 'node-fetch';

const GATEKEEPER_URL = process.env.GATEKEEPER_URL || 'http://localhost:3000';

async function testGatekeeper() {
  console.log('🧪 Testing Blog Gatekeeper AI\n');
  console.log(`Endpoint: ${GATEKEEPER_URL}\n`);

  // Test 1: Health check
  console.log('1️⃣  Health Check');
  try {
    const res = await fetch(`${GATEKEEPER_URL}/`);
    const data = await res.json();
    console.log('✅ Status:', data.status);
    console.log('   Protections:', data.protections.join(', '));
    console.log('   AI Enabled:', data.ai_enabled);
    console.log('');
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return;
  }

  // Test 2: First post - should PUBLISH
  console.log('2️⃣  Test: First Post (should PUBLISH)');
  const post1 = {
    title: 'AI-Powered Software Development: The Future is Here',
    body: `
      <article>
        <h1>The Future of Software Development</h1>
        <p>Artificial intelligence is revolutionizing how we build software. 
        At TalPro, we're leveraging cutting-edge AI technologies to deliver 
        exceptional results for our clients.</p>
        
        <h2>Key Benefits</h2>
        <ul>
          <li>Faster development cycles</li>
          <li>Improved code quality</li>
          <li>Enhanced testing capabilities</li>
          <li>Better project estimation</li>
        </ul>
        
        <p>Our team combines deep technical expertise with AI-powered tools 
        to create robust, scalable solutions that drive business growth.</p>
      </article>
    `,
    source_url: 'https://example.com/ai-development-future'
  };

  try {
    const res = await fetch(`${GATEKEEPER_URL}/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post1)
    });
    const data = await res.json();
    console.log('   Action:', data.action);
    console.log('   MinHash Similarity:', data.minhash?.similarity);
    if (data.ai?.enabled) {
      console.log('   AI Quality Score:', data.ai.quality_score);
      console.log('   AI Brand Voice:', data.ai.brand_voice_match);
      console.log('   AI Decision:', data.ai.decision);
      console.log('   SEO Title:', data.ai.seo_title);
      console.log('   Tags:', data.ai.recommended_tags?.join(', '));
    }
    console.log('   Final Decision:', data.final_decision);
    console.log('   Reason:', data.reason);
    console.log('');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  // Test 3: Duplicate source URL - should SKIP
  console.log('3️⃣  Test: Duplicate Source (should SKIP)');
  const post2 = {
    title: 'Same Article Reposted',
    body: 'Different content but same URL',
    source_url: 'https://example.com/ai-development-future?utm_source=twitter'
  };

  try {
    const res = await fetch(`${GATEKEEPER_URL}/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post2)
    });
    const data = await res.json();
    console.log('   Action:', data.action);
    console.log('   Reason:', data.reason);
    console.log('');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  // Test 4: Similar content - should REVIEW (high MinHash similarity)
  console.log('4️⃣  Test: Similar Content (should REVIEW due to similarity)');
  const post3 = {
    title: 'AI-Powered Software: Transforming Development',
    body: `
      <div>
        <p>Artificial intelligence is changing software development. 
        At TalPro, we use AI tools to deliver great results.</p>
        
        <p>Benefits include faster development, better code quality, 
        improved testing, and accurate estimates.</p>
        
        <p>We combine expertise with AI-powered solutions for business growth.</p>
      </div>
    `,
    source_url: 'https://example.com/ai-transforms-dev'
  };

  try {
    const res = await fetch(`${GATEKEEPER_URL}/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post3)
    });
    const data = await res.json();
    console.log('   Action:', data.action);
    console.log('   MinHash Similarity:', data.minhash?.similarity);
    if (data.ai?.enabled) {
      console.log('   AI Is Duplicate:', data.ai.is_duplicate);
      console.log('   AI Decision:', data.ai.decision);
    }
    console.log('   Final Decision:', data.final_decision);
    console.log('   Reason:', data.reason);
    console.log('');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  // Test 5: Low quality content - should REVIEW
  console.log('5️⃣  Test: Low Quality Content (AI should flag)');
  const post4 = {
    title: 'Check this out!!!',
    body: `
      <p>hey guys so i think software is cool and stuff. 
      like really cool. you should totally hire us because we're awesome.
      click here now!!!</p>
    `,
    source_url: 'https://example.com/low-quality-post'
  };

  try {
    const res = await fetch(`${GATEKEEPER_URL}/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post4)
    });
    const data = await res.json();
    console.log('   Action:', data.action);
    if (data.ai?.enabled) {
      console.log('   AI Quality Score:', data.ai.quality_score);
      console.log('   AI Brand Voice:', data.ai.brand_voice_match);
      console.log('   AI Decision:', data.ai.decision);
    }
    console.log('   Final Decision:', data.final_decision);
    console.log('   Reason:', data.reason);
    console.log('');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  // Test 6: High quality, unique content - should PUBLISH
  console.log('6️⃣  Test: High Quality Content (should PUBLISH)');
  const post5 = {
    title: 'Mobile App Development Best Practices for Enterprise',
    body: `
      <article>
        <h1>Enterprise Mobile App Development</h1>
        <p>Building enterprise mobile applications requires a strategic approach 
        that balances user experience, security, and scalability. At TalPro, 
        we've developed hundreds of successful mobile apps for Fortune 500 companies.</p>
        
        <h2>Key Considerations</h2>
        <p>Security is paramount in enterprise environments. We implement 
        end-to-end encryption, biometric authentication, and comply with 
        industry standards like SOC 2 and ISO 27001.</p>
        
        <h2>Platform Strategy</h2>
        <p>Cross-platform frameworks like React Native offer significant 
        advantages for enterprise deployments, including faster time-to-market 
        and reduced development costs while maintaining native performance.</p>
        
        <p>Our proven methodology ensures seamless integration with existing 
        enterprise systems, comprehensive testing, and ongoing support.</p>
      </article>
    `,
    source_url: 'https://example.com/enterprise-mobile-best-practices'
  };

  try {
    const res = await fetch(`${GATEKEEPER_URL}/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post5)
    });
    const data = await res.json();
    console.log('   Action:', data.action);
    console.log('   MinHash Similarity:', data.minhash?.similarity);
    if (data.ai?.enabled) {
      console.log('   AI Quality Score:', data.ai.quality_score);
      console.log('   AI Brand Voice:', data.ai.brand_voice_match);
      console.log('   AI Decision:', data.ai.decision);
      console.log('   SEO Title:', data.ai.seo_title);
      console.log('   Tags:', data.ai.recommended_tags?.join(', '));
    }
    console.log('   Final Decision:', data.final_decision);
    console.log('');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  // Statistics
  console.log('📊 Getting Statistics');
  try {
    const res = await fetch(`${GATEKEEPER_URL}/_stats`);
    const data = await res.json();
    console.log('   Total Posts:', data.total);
    console.log('   By Decision:', JSON.stringify(data.by_decision, null, 2));
    console.log('   Avg Quality Score:', data.avg_quality_score);
    console.log('');
  } catch (error) {
    console.error('❌ Stats failed:', error.message);
  }

  console.log('✅ Testing complete!\n');
}

testGatekeeper().catch(console.error);
