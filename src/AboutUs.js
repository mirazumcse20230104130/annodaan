import React, { useState, useEffect } from 'react';
import './AboutUs.css';
import headerImage from './header.jpg';
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
                <div className="box">Food Distributed: 10,000+ Meals</div>
                <div className="box">Communities Served: 50+</div>
                <div className="box">Volunteers: 200+</div>
                <div className="box">Sustainability Rate: 85%</div>
              </div>
            </>
          )}

          {showTeam && (
            <>
              <div className="header-image">
                <img src={headerImage} alt="Team Header" />
                <div className="overlay-text">
                  Meet Our Dedicated Team
                  <div className="overlay-subtext">“Our dedicated team works passionately to make food donation simple and impactful. Each member brings unique skills to help communities in need. Together, we strive to create a sustainable and compassionate future through our collective efforts.”</div>
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