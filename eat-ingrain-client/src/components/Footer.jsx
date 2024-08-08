import React from "react";
import { NavLink } from "react-router-dom";
import "../pages/Style.css"

const Footer = () => {
  return (
    <>
      {/* Footer 1 */}
      <footer className="footer p-6 lighter-border text-base-content bg-ingrain-board-color">
        <div className="flex flex-row justify-between sm:justify-evenly w-full">
          <nav className="flex flex-col">
            <h6 className="footer-title">Services</h6>
            <NavLink to="/events" className="link link-hover">
              Events
            </NavLink>
            <NavLink className="link link-hover">Catering</NavLink>
            <NavLink to="/shop" className="link link-hover">
              Shop
            </NavLink>
          </nav>
          <nav className="flex flex-col">
            <h6 className="footer-title">Company</h6>
            <NavLink to="/about" className="link link-hover">
              About us
            </NavLink>
            <NavLink to="/contact" className="link link-hover">
              Contact
            </NavLink>
          </nav>
          <nav className="flex flex-col">
            <h6 className="footer-title">Legal</h6>
            <NavLink className="link link-hover">Terms of use</NavLink>
            <NavLink className="link link-hover">Privacy policy</NavLink>
            <NavLink className="link link-hover">Cookie policy</NavLink>
          </nav>
        </div>
      </footer>

      {/* Footer 2 */}
      <footer className="footer px-10 py-4 lighter-border text-base-content border-base-300 bg-ingrain-board-color">
        <div className="flex flex-col items-center md:flex-row justify-between w-full">
          <aside className="flex items-center space-x-4 flex-col md:flex-row">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
            <p className="aesthet-nova-h3 text-center md:text-left">
              INGRAIN LLC
              <br />
              The art of crafting cool food
            </p>
          </aside>
          <nav>
            <div className="grid grid-flow-col gap-4">
              <a
                href="https://www.youtube.com/@eat.ingrain"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="currentColor"
                      d="M12 4c.855 0 1.732.022 2.582.058l1.004.048l.961.057l.9.061l.822.064a3.802 3.802 0 0 1 3.494 3.423l.04.425l.075.91c.07.943.122 1.971.122 2.954c0 .983-.052 2.011-.122 2.954l-.075.91c-.013.146-.026.287-.04.425a3.802 3.802 0 0 1-3.495 3.423l-.82.063l-.9.062l-.962.057l-1.004.048A61.59 61.59 0 0 1 12 20a61.59 61.59 0 0 1-2.582-.058l-1.004-.048l-.961-.057l-.9-.062l-.822-.063a3.802 3.802 0 0 1-3.494-3.423l-.04-.425l-.075-.91A40.662 40.662 0 0 1 2 12c0-.983.052-2.011.122-2.954l.075-.91c.013-.146.026-.287.04-.425A3.802 3.802 0 0 1 
                5.73 4.288l.821-.064l.9-.061l.962-.057l1.004-.048A61.676 61.676 0 0 1 12 4m-2 5.575v4.85c0 .462.5.75.9.52l4.2-2.425a.6.6 0 0 0 0-1.04l-4.2-2.424a.6.6 0 0 0-.9.52Z"
                    />
                  </g>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/eat.ingrain"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="33"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 
                5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 
                1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                  />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Footer;
