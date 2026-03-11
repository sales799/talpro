import fetch from 'node-fetch';

const GATEKEEPER_URL = 'http://localhost:3333';

async function demo() {
  console.log('🎬 Blog Gatekeeper AI - Live Demo\n');
  console.log('================================================\n');

  // Test 1: Health Check
  console.log('✅ Test 1: Health Check');
  console.log('   Checking if gatekeeper is online...\n');
  
  try {
    const health = await fetch(`${GATEKEEPER_URL}/`);
    const healthData = await health.json();
    console.log('   Status:', healthData.status);
    console.log('   Protections:', healthData.protections.join(', '));
    console.log('   AI Enabled:', healthData.ai_enabled);
    console.log('   Similarity Threshold:', healthData.similarity_threshold);
    console.log('   Min Quality Score:', healthData.min_quality_score);
    console.log('\n================================================\n');
  } catch (error) {
    console.log('   ❌ Error:', error.message);
    return;
  }

  // Test 2: High-Quality Content (should PUBLISH)
  console.log('✅ Test 2: High-Quality Content');
  console.log('   Submitting professional software development article...\n');
  
  const goodContent = {
    title: 'Enterprise Mobile App Development Best Practices',
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
    console.log('   ⏳ Analyzing with AI (this may take 10-20 seconds)...\n');
    const start = Date.now();
    
    const response = await fetch(`${GATEKEEPER_URL}/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goodContent)
    });
    
    const data = await response.json();
    const duration = ((Date.now() - start) / 1000).toFixed(1);
    
    console.log(`   ✨ Analysis completed in ${duration}s\n`);
    console.log('   📊 MinHash Similarity:', data.minhash?.similarity?.toFixed(3));
    console.log('   🤖 AI Quality Score:', data.ai?.quality_score, '/ 10');
    console.log('   🎨 AI Brand Voice Match:', data.ai?.brand_voice_match, '/ 10');
    console.log('   🔍 AI Detected Duplicate:', data.ai?.is_duplicate);
    console.log('   📝 AI Decision:', data.ai?.decision?.toUpperCase());
    console.log('   🏷️  Recommended Tags:', data.ai?.recommended_tags?.join(', '));
    console.log('   🎯 SEO Title:', data.ai?.seo_title);
    console.log('\n   🎉 FINAL DECISION:', data.final_decision.toUpperCase());
    console.log('   💬 Reason:', data.reason);
    console.log('\n================================================\n');
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  // Test 3: Duplicate Detection
  console.log('✅ Test 3: Duplicate Source Detection');
  console.log('   Submitting same article again...\n');
  
  try {
    const response2 = await fetch(`${GATEKEEPER_URL}/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...goodContent, title: 'Different Title' })
    });
    
    const data2 = await response2.json();
    console.log('   🎉 DECISION:', data2.action);
    console.log('   💬 Reason:', data2.reason);
    console.log('\n================================================\n');
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  // Test 4: Low Quality Content
  console.log('✅ Test 4: Low Quality Content');
  console.log('   Submitting unprofessional content...\n');
  
  const badContent = {
    title: 'Check this out!!!',
    body: '<p>hey guys so i think software is cool and stuff. like really cool. you should totally hire us because were awesome. click here now!!!</p>',
    source_url: 'https://example.com/low-quality-post'
  };

  try {
    console.log('   ⏳ Analyzing...\n');
    const response3 = await fetch(`${GATEKEEPER_URL}/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(badContent)
    });
    
    const data3 = await response3.json();
    console.log('   🤖 AI Quality Score:', data3.ai?.quality_score, '/ 10');
    console.log('   🎨 AI Brand Voice Match:', data3.ai?.brand_voice_match, '/ 10');
    console.log('   🎉 FINAL DECISION:', data3.final_decision.toUpperCase());
    console.log('   💬 Reason:', data3.reason);
    console.log('\n================================================\n');
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  // Test 5: Statistics
  console.log('✅ Test 5: Gatekeeper Statistics');
  console.log('   Fetching analytics...\n');
  
  try {
    const stats = await fetch(`${GATEKEEPER_URL}/_stats`);
    const statsData = await stats.json();
    console.log('   📈 Total Posts Processed:', statsData.total);
    console.log('   📊 By Decision:');
    for (const [decision, count] of Object.entries(statsData.by_decision || {})) {
      console.log(`      - ${decision}: ${count}`);
    }
    console.log('   ⭐ Average Quality Score:', statsData.avg_quality_score?.toFixed(2) || 'N/A');
    console.log('\n================================================\n');
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  console.log('✅ Demo Complete!\n');
}

demo().catch(console.error);
