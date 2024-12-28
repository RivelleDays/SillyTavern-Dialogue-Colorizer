import { ColorizeSourceType, ColorizeTargetType } from "./index.js";
import { linkInputColorTextPicker } from "./utils.js";
import {t} from '../../../i18n.js';

/** @typedef {{value: any, text: string, description: string}} DropdownOptionObject */

/**
 * 
 * @param {string} templateId 
 * @param {boolean?} deep 
 * @returns {DocumentFragment}
 */
export function createTemplateClone(templateId, deep) {
    const tpl = /** @type {HTMLTemplateElement} */ (document.getElementById(templateId));
    return /** @type {DocumentFragment} */ (tpl.content.cloneNode(deep));
}

/**
 * @param {(textboxValue: string) => string?} textboxValueProcessor 
 * @param {(colorHex: string) => void} onColorChanged 
 * @returns 
 */
export function createColorTextPickerCombo(textboxValueProcessor, onColorChanged) {
    const textInput = document.createElement('input');
    textInput.className = "text_pole textarea_compact";
    textInput.type = "text";

    const pickerInput = document.createElement('input');
    pickerInput.className = "dc-color-picker";
    pickerInput.type = "color";

    const pickerWrapper = document.createElement('div');
    pickerWrapper.className = "dc-color-picker-wrapper";
    pickerWrapper.appendChild(pickerInput);

    const wrapper = document.createElement('div');
    wrapper.className = "dc-color-input-combo";
    wrapper.appendChild(pickerWrapper);
    wrapper.appendChild(textInput);

    linkInputColorTextPicker(pickerInput, textInput, textboxValueProcessor, onColorChanged);
    return wrapper;
}

/**
 * 
 * @param {string} id The ID to set on the created elements.
 * @param {DropdownOptionObject[]} optionObjects 
 * @param {string=} labelText The string for the label.
 * @param {string=} description The help text for the label and contents.
 * @param {((event: Event) => void)=} onChangedCallback The 'onchange' callback to add to the dropdown.
 * @returns {HTMLDivElement} The div containing the label and dropdown.
 */
export function createDropdownWithLabel(id, optionObjects, labelText, description, onChangedCallback) {
    const dropdownLabel = document.createElement('label');
    dropdownLabel.htmlFor = id;
    dropdownLabel.innerHTML = t`${labelText}`;
    if (description) {
        dropdownLabel.title = t`${description}`;
        dropdownLabel.innerHTML += `<span class="margin5 fa-solid fa-circle-info opacity50p"></span>`;
    }

    const dropdown = document.createElement('select');
    dropdown.id = id;
    dropdown.name = id;
    optionObjects.forEach((optionObj) => {
        const elemOption = document.createElement('option');
        elemOption.value = optionObj.value;
        elemOption.title = t`${optionObj.description}`;
        elemOption.innerHTML = t`${optionObj.text}`;
        dropdown.appendChild(elemOption);
    });

    if (onChangedCallback) {
        dropdown.addEventListener('change', onChangedCallback);
    }

    const wrapper = document.createElement('div');
    wrapper.appendChild(dropdownLabel);
    wrapper.appendChild(dropdown);
    return wrapper;
}

/**
 * 
 * @param {string} id The ID to set on the created elements.
 * @param {((event: Event) => void)=} onChangedCallback The 'onchange' callback to add to the dropdown.
 * @returns {HTMLDivElement} The div containing the label and dropdown.
 */
export function createColorSourceDropdown(id, onChangedCallback) {
    const options = [
        {
            value: ColorizeSourceType.AVATAR_VIBRANT, 
            text: t`Avatar Vibrant`, 
            description: t`Use a vibrant color dynamically calculated from the character's avatar.`
        },
        {
            value: ColorizeSourceType.STATIC_COLOR, 
            text: t`Static Color`, 
            description: t`Use a specified static color.`
        },
        {
            value: ColorizeSourceType.CHAR_COLOR_OVERRIDE, 
            text: t`Per-Character Only`, 
            description: t`Use the default quote color except for characters with a specified override color.`},
    ];

    return createDropdownWithLabel(id, options, t`Color Source`, t`The source to use for dialogue color.`, onChangedCallback);
}

/**
 * 
 * @param {string} id The ID to set on the created elements.
 * @param {((event: Event) => void)=} onChangedCallback The 'onchange' callback to add to the dropdown.
 * @returns {HTMLDivElement} The div containing the label and dropdown.
 */
export function createColorTargetDropdown(id, onChangedCallback) {
    /** @type {DropdownOptionObject[]} */
    const options = [
        {
            value: ColorizeTargetType.BUBBLES, 
            text: t`Chat Bubbles`, 
            description: t`Color the chat bubbles. Only works with the 'Bubbles' chat style.` 
        },
        {
            value: ColorizeTargetType.QUOTED_TEXT, 
            text: t`Quoted Text`, 
            description: t`Color quoted text.` 
        },
        {
            value: ColorizeTargetType.QUOTED_TEXT_AND_BUBBLES, 
            text: t`All`, 
            description: t`Color both chat bubbles and quoted text.` 
        },
    ];

    return createDropdownWithLabel(id, options, t`Color Targets`, t`Which elements to color.`, onChangedCallback);
}
