import React from 'react';
import './App.css';

function LandingPage({ goToLogin }) {
  return (
    <div className="landing-container">
      <h1>Biography of the World's Worst Political Figures</h1>
      <p>By: Mark Aaron B. Dayrit</p>
      
      <h2>Famous Authoritarians</h2>
      <div className="leader-bios">
        <div className="leader-bio">
          <img src="images/hitler.jpg" alt="Adolf Hitler" className="leader-image" />
          <h3>Adolf Hitler</h3>
          <p>
            <strong>Adolf Hitler</strong> led Nazi Germany from 1933 to 1945. Under his regime, millions of people, including six million Jews, were systematically murdered in the Holocaust. Hitler’s expansionist policies led to World War II, resulting in catastrophic global conflict. His authoritarian rule is marked by extreme nationalism, brutal repression, and a devastating war that reshaped the world.
          </p>
        </div>

        <div className="leader-bio">
          <img src="images/stalin.jpg" alt="Joseph Stalin" className="leader-image" />
          <h3>Joseph Stalin</h3>
          <p>
            <strong>Joseph Stalin</strong> was the leader of the Soviet Union from the mid-1920s until his death in 1953. Known for his brutal purges, mass executions, and forced labor camps, Stalin consolidated power through terror and fear. His policies led to the death of millions, yet he is remembered for his role in defeating Nazi Germany in World War II and transforming the USSR into a global superpower.
          </p>
        </div>

        <div className="leader-bio">
          <img src="images/mussolini.jpg" alt="Benito Mussolini" className="leader-image" />
          <h3>Benito Mussolini</h3>
          <p>
            <strong>Benito Mussolini</strong> was the dictator of Italy from 1922 until his ousting in 1943. Mussolini founded the fascist ideology and sought to create a totalitarian state. His alliance with Hitler during World War II led to the collapse of his regime. Mussolini's rule was marked by extreme nationalism, military expansionism, and censorship, leaving a dark legacy on Italy.
          </p>
        </div>

        <div className="leader-bio">
          <img src="images/kimjongun.jpg" alt="Kim Jong-un" className="leader-image" />
          <h3>Kim Jong-un</h3>
          <p>
            <strong>Kim Jong-un</strong> became the Supreme Leader of North Korea in 2011 following the death of his father, Kim Jong-il. As the leader of the most secretive and isolated state in the world, Kim’s reign has been marked by nuclear weapons development, severe repression of dissidents, and total control over the lives of his people. His personality cult and autocratic leadership keep North Korea firmly under his grip.
          </p>
        </div>

        <div className="leader-bio">
          <img src="images/mao.jpg" alt="Mao Zedong" className="leader-image" />
          <h3>Mao Zedong</h3>
          <p>
            <strong>Mao Zedong</strong> was the founding father of the People’s Republic of China, leading the country from 1949 until his death in 1976. Mao’s policies, such as the Great Leap Forward and the Cultural Revolution, resulted in the deaths of millions through famine, purges, and violent upheavals. Despite his brutal regime, Mao is still revered in China as a founding figure of the modern state.
          </p>
        </div>

        <div className="leader-bio">
          <img src="images/pinochet.jpg" alt="Augusto Pinochet" className="leader-image" />
          <h3>Augusto Pinochet</h3>
          <p>
            <strong>Augusto Pinochet</strong> ruled Chile from 1973 to 1990 after a military coup ousted the democratically elected government. Pinochet’s dictatorship was marked by extreme repression, human rights abuses, and the creation of a deeply militarized state. Despite allegations of widespread torture and killings, his economic policies led to rapid modernization of Chile’s economy, though at a great human cost.
          </p>
        </div>

        <div className="leader-bio">
          <img src="images/putin.jpg" alt="Vladimir Putin" className="leader-image" />
          <h3>Vladimir Putin</h3>
          <p>
            <strong>Vladimir Putin</strong> has ruled Russia since 1999, first as President, then as Prime Minister, and again as President. His rule has been marked by significant suppression of political dissent, control over the media, and the centralization of power. Putin's regime has been characterized by aggressive foreign policies, particularly in Ukraine, and a firm grip on Russian society.
          </p>
        </div>
      </div>

    </div>
  );
}

export default LandingPage;
