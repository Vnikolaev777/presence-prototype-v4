export function SchoolBefore() {
  return (
    <div style={{ fontFamily: '"Times New Roman", Times, serif', backgroundColor: '#e0e0e0', minHeight: '100vh', paddingBottom: '50px' }}>
      
      {/* Ugly Header */}
      <div style={{ backgroundColor: '#000080', padding: '20px', textAlign: 'center', borderBottom: '4px solid #ffff00' }}>
        <h1 style={{ color: '#ffff00', margin: 0, fontSize: '36px', textTransform: 'uppercase' }}>Oakwood High School</h1>
        <p style={{ color: 'white', fontStyle: 'italic', marginTop: '5px' }}>"Excellence in Education since 1954"</p>
      </div>

      {/* Ugly Navigation */}
      <div style={{ backgroundColor: '#c0c0c0', padding: '10px', display: 'flex', gap: '15px', justifyContent: 'center', borderBottom: '2px solid black' }}>
        <a href="#" style={{ color: 'blue', textDecoration: 'underline', fontWeight: 'bold' }}>Home</a>
        <a href="#" style={{ color: 'blue', textDecoration: 'underline', fontWeight: 'bold' }}>About Us</a>
        <a href="#" style={{ color: 'blue', textDecoration: 'underline', fontWeight: 'bold' }}>Academics</a>
        <a href="#" style={{ color: 'blue', textDecoration: 'underline', fontWeight: 'bold' }}>Athletics</a>
        <a href="#" style={{ color: 'blue', textDecoration: 'underline', fontWeight: 'bold' }}>Directory</a>
      </div>

      {/* Main Content Area */}
      <div style={{ maxWidth: '900px', margin: '20px auto', backgroundColor: 'white', padding: '20px', border: '2px solid #808080' }}>
        
        <h2>Welcome to Oakwood High!</h2>
        <p>Welcome to our official internet homepage. Please use the links above to navigate.</p>

        <hr style={{ margin: '20px 0' }} />

        <div style={{ display: 'flex', gap: '40px' }}>
          
          {/* Left Column */}
          <div style={{ width: '60%' }}>
            <h3 style={{ backgroundColor: '#000080', color: 'white', padding: '5px' }}>Latest News Announcements</h3>
            
            <div style={{ border: '1px solid black', padding: '10px', marginBottom: '15px', backgroundColor: '#ffffcc' }}>
              <h4 style={{ margin: '0 0 5px 0' }}>Welcome Back from Summer Break!</h4>
              <p style={{ margin: 0, fontSize: '14px' }}><em>Posted: September 1st</em></p>
              <p style={{ fontSize: '14px' }}>We hope everyone had a fantastic summer. Classes begin promptly at 8:00 AM.</p>
            </div>

            <div style={{ border: '1px solid black', padding: '10px', marginBottom: '15px' }}>
              <h4 style={{ margin: '0 0 5px 0' }}>Cafeteria Menu Update</h4>
              <p style={{ margin: 0, fontSize: '14px' }}><em>Posted: October 12th</em></p>
              <p style={{ fontSize: '14px' }}>Pizza Friday is back! Salads are also available.</p>
            </div>
            
            <p style={{ color: 'red', fontStyle: 'italic', fontSize: '12px' }}>* No recent updates available.</p>
          </div>

          {/* Right Column */}
          <div style={{ width: '40%' }}>
            
            <h3 style={{ backgroundColor: '#000080', color: 'white', padding: '5px' }}>Quick Links & Resources</h3>
            <ul style={{ paddingLeft: '20px' }}>
              <li><a href="#" style={{ color: 'blue' }}>School Calendar (PDF)</a></li>
              <li><a href="#" style={{ color: 'blue' }}>Parent Portal Login</a></li>
              <li style={{ marginTop: '10px' }}>
                <strong>Important Download:</strong><br />
                <a href="#" style={{ color: 'blue' }}>↳ Parent Handbook 2023.doc</a>
              </li>
            </ul>

            <h3 style={{ backgroundColor: '#000080', color: 'white', padding: '5px', marginTop: '30px' }}>Staff Spotlight</h3>
            <div style={{ border: '1px solid #ccc', padding: '10px' }}>
              <strong>Math Department:</strong>
              <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '14px' }}>
                <li>Mrs. Smith - Calculus</li>
                <li>Mr. Johnson - Algebra II</li>
              </ul>
            </div>

          </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '12px', color: '#666' }}>
          &copy; 1999-2023 Oakwood High School. Best viewed in Internet Explorer 6.0 at 800x600 resolution.
        </div>
      </div>

    </div>
  );
}
