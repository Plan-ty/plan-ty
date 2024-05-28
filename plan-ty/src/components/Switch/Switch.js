import React from "react";
import "./Switch.css";
import cx from "classnames";

const Switch = ({ rounded = true, isToggled, onToggle }) => {

    const sliderCX = cx('slider', {
        'rounded': rounded
    });

    const handleToggle = () => {
        onToggle(!isToggled);
    };

    return (
        <label className="switch">
            <input type="checkbox" checked={isToggled} onChange={handleToggle}/>
            <span className={sliderCX}/>
        </label>
    );
};

export default Switch;
