import React, { useState, useEffect } from 'react';
import './AboutUs.css';
import headerImage from './header.jpg';
import teamBannerImage from './team-banner.jpg'; // separate team banner
import team1Image from './team1.jpg';
import team2Image from './team2.jpg';
import team3Image from './team3.jpg';

const AboutUs = () => {
  const [showMission, setShowMission] = useState(true);
  const [showTeam, setShowTeam] = useState(false);

  useEffect(() => {
    const handleSectionChange = (event) => {
      const section = event.detail;
      if (section === 'mission') {
        setShowMission(true);
        setShowTeam(false);
      } else if (section === 'team') {
        setShowMission(false);
        setShowTeam(true);
      }
      console.log('Nav section changed to:', section);
    };

    window.addEventListener('navSectionChange', handleSectionChange);
    return () => window.removeEventListener('navSectionChange', handleSectionChange);
  }, []);

  return (
    <div className="about-us-container">
      <div className="main-layout">
        <div className="content-section">

          {/* Mission Section */}
          {showMission && (
            <>
              <div className="header-image">
                <img src={headerImage} alt="Mission Header" />
                <div className="overlay-text">
                  Our Mission and Impact
                  <div className="overlay-subtext">
                    “Our mission is to fight hunger by reducing food waste and connecting surplus food with those in need. Every donation brings hope and nourishment to vulnerable communities. We aim to create a world where no one goes hungry, and every meal counts. Together, we build a compassionate and sustainable future through food donation.”
                  </div>
                </div>
              </div>

              <div className="mission-boxes">
                <div className="box">
                  We have distributed over 10,000 meals <br />
                  to communities in need, reaching people <br />
                  in every corner of the city.
                </div>
                <div className="box">
                  Our programs have served more than 50 <br />
                  different communities, helping families <br />
                  improve their daily lives.
                </div>
                <div className="box">
                  A team of 200 dedicated volunteers <br />
                  works tirelessly to deliver food <br />
                  and support to those who need it most.
                </div>
                <div className="box">
                  We maintain a sustainability rate of 85%, <br />
                  ensuring long-term impact in every <br />
                  project we undertake.
                </div>
              </div>
            </>
          )}

          {/* Team Section */}
          {showTeam && (
            <>
              <div className="header-image team-header">
                <img src={teamBannerImage} alt="Team Header" />
                <div className="overlay-text">
                  Meet Our Dedicated Team
                  <div className="overlay-subtext">
                    “Our dedicated team works passionately to make food donation simple and impactful. Each member brings unique skills to help communities in need. Together, we strive to create a sustainable and compassionate future through our collective efforts.”
                  </div>
                </div>
              </div>

              <div className="team-boxes">
                <div className="box">
                  <img src={team1Image} alt="Team Member 1" />
                  <div className="team-info">
                    <p><strong>Name:</strong> Rifa Rafia</p>
                    <p><strong>Email:</strong> refa.cse.20230104127@aust.edu</p>
                    <p>Ahsanullah University of Science Technology</p>
                  </div>
                </div>

                <div className="box">
                  <img src={team2Image} alt="Team Member 2" />
                  <div className="team-info">
                    <p><strong>Name:</strong> Mirazum Munira Mahin</p>
                    <p><strong>Email:</strong> mahi.cse.20230104127@aust.edu</p>
                    <p>Ahsanullah University of Science Technology</p>
                  </div>
                </div>

                <div className="box">
                  <img src={team3Image} alt="Team Member 3" />
                  <div className="team-info">
                    <p><strong>Name:</strong> Jemima Ahmed</p>
                    <p><strong>Email:</strong> jemima.20230104133@aust.edu</p>
                    <p>Ahsanullah University of Science Technology</p>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
