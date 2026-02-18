
/**
 * 
 * @param {HTMLElement} panel -- The html element that needs to be translated
 * @param {} param1  -- The param along to define where it needs to go either x or y axis
 */
export default function animatePanel(panel, { axis = "X", value = 100, unit = "%" }) {

    panel.style.display = "flex";

    requestAnimationFrame(() => {

        panel.style.transform = `translate${axis}(${value}${unit})`;

    });

}
