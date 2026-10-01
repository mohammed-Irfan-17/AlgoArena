import React from "react";
import { ArrowUpRight } from "lucide-react";

import "./NextFocus.css";

function NextFocus({ concept }) {
    if (!concept) {
        return null;
    }

    return (
        <section className="next-focus-section">

            <div className="next-focus-icon">
                <ArrowUpRight size={25} />
            </div>

            <div className="next-focus-content">

                <span className="next-focus-label">
                    NEXT FOCUS
                </span>

                <h2>
                    {concept}
                </h2>

                <p>
                    Strengthen your understanding of efficient
                    algorithms and improve your problem-solving approach.
                </p>

            </div>

        </section>
    );
}

export default NextFocus;