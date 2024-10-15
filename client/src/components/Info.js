import React from "react";
import InformationCard from "./InformationCard";
import {faUserShield, faCalendarCheck,faStethoscope} from "@fortawesome/free-solid-svg-icons";
import "./Info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>What We Do</span>
        </h3>
        <p className="info-description">
          We bring healthcare to your convenience, offering a comprehensive
          range of on-demand medical services tailored to your needs. Our
          platform allows you to connect with experienced online doctors who
          provide expert medical advice, issue online prescriptions, and offer
          quick refills whenever you require them.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Book for free, pay at the clinic"
          description="
The examination price on Vezeeta is the same as the examination price at the clinic, without any additional costs.."
        icon={faUserShield}
        />

        <InformationCard
          title="Your reservation is confirmed with the doctor"
          description="
Your reservation is confirmed once you choose from the doctor's available appointments."
        icon={faCalendarCheck}
              />

              
        <InformationCard
          title="All Needs in YouDawi"
                  description="Search and book an appointment with a doctor in a clinic,
           hospital, home visit, or over the phone. You can also order medications, or book a service or operation at the best price."
        icon={faStethoscope}
        />
      </div>
    </div>
  );
}

export default Info;
