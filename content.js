(function() {
  var terminate = terminate || false;

  document.addEventListener('mousedown', function(event) {
  const el = event.target;
  if (
    (el.getAttribute('data-automation-id') === 'pageFooterNextButton' && el.textContent.includes('Save and Continue')) ||
    (el.getAttribute('data-automation-id') === 'signInSubmitButton' && el.textContent.includes('Sign In')) ||
    (el.getAttribute('data-automation-id') === 'createAccountSubmitButton' && el.textContent.includes('Create Account'))
  ) {
    terminate = true;
  }
}, true);



function waitForElement(selector, timeout = 3000) {
  return new Promise((resolve) => {
    const interval = 100;
    let elapsed = 0;
    const timer = setInterval(() => {
      const el = document.querySelector(selector);
      if (el) {
        clearInterval(timer);
        resolve(el);
      } else if (elapsed > timeout) {
        clearInterval(timer);
        resolve(null);
      }
      elapsed += interval;
    }, interval);
  });
}

const messageQueue = [];
let messageShowing = false;

function showStatusMessage(message, duration = 1500) {
  messageQueue.push(message);saveMessageLog
  if (!messageShowing) displayNextMessage();

  async function displayNextMessage() {
    if (messageQueue.length === 0) {
      messageShowing = false;
      return;
    }
    messageShowing = true;
    const msg = messageQueue.shift();
    let statusBox = document.getElementById("autofill-status-box");
    if (!statusBox) {
      statusBox = document.createElement("div");
      statusBox.id = "autofill-status-box";
      Object.assign(statusBox.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 20px",
        backgroundColor: "rgba(0,0,0,0.8)",
        color: "white",
        fontSize: "14px",
        borderRadius: "5px",
        zIndex: 10000,
        fontFamily: "Arial, sans-serif",
        transition: "opacity 0.3s",
        opacity: "1",
      });
      document.body.appendChild(statusBox);
    }
    statusBox.textContent = msg;
    statusBox.style.display = "block";
    statusBox.style.opacity = "1";
    await new Promise((r) => setTimeout(r, duration));
    statusBox.style.opacity = "0";
    setTimeout(() => {
      statusBox.style.display = "none";
      displayNextMessage();
    }, 300);
  }
}

async function saveMessageLog(message) {
  chrome.storage.local.get({ messageLog: [] }, (data) => {
    const logs = data.messageLog;
    logs.push(`[${new Date().toISOString()}] ${message}`);
    chrome.storage.local.set({ messageLog: logs });
  });

  // Usage example (insert in your main routines and loops):
if (terminate) {
    showStatusMessage("Terminated!!!");
    return;
} // Stops further execution
}

async function selectPreviousWorkerRadio(value) {
  const radios = document.getElementsByName("candidateIsPreviousWorker");
  if (!radios.length) {
    showStatusMessage("Radio group candidateIsPreviousWorker not found");
    await saveMessageLog("Radio group candidateIsPreviousWorker not found");
    return;
  }
  for (const radio of radios) {
    const val = radio.value;
    if (!val) {
      showStatusMessage("Skipping radio with undefined or empty value");
      await saveMessageLog("Skipping radio with undefined or empty value");
      continue;
    }
    showStatusMessage(`Radio.value='${val.toLowerCase()}', expected='${String(value).toLowerCase()}'`);
    await saveMessageLog(`Radio.value='${val.toLowerCase()}', expected='${String(value).toLowerCase()}'`);
    if (val.toLowerCase() === String(value).toLowerCase()) {
      radio.checked = true;
      radio.click();
      radio.dispatchEvent(new Event("input", { bubbles: true }));
      radio.dispatchEvent(new Event("change", { bubbles: true }));
      //showStatusMessage(`Selected '${value}' on candidateIsPreviousWorker`);
      await saveMessageLog(`Selected '${value}' on candidateIsPreviousWorker`);
      break;
    }

    // Usage example (insert in your main routines and loops):
if (terminate) {
    showStatusMessage("Terminated!!!");
    return;
} // Stops further execution
  }
}

async function fillField(field, value) {
  if (!field || value === undefined) return;
  if (field.type === 'checkbox') {
    await new Promise(resolve => setTimeout(resolve, 250));
    field.checked = !!value;
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
    field.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    dispatchMouseClick(field);
    await new Promise(resolve => setTimeout(resolve, 250));
  } else {
    field.focus();
    field.value = value;
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
    dispatchMouseClick(field);
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  //showStatusMessage(`Filled field ${field.id || field.name || field.tagName}`);
  await saveMessageLog(`Filled field ${field.id || field.name || field.tagName}`);
  // Usage example (insert in your main routines and loops):
if (terminate) {
    showStatusMessage("Terminated!!!");
    return;
} // Stops further execution
}

function dispatchMouseClick(element) {
  const evt = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  element.dispatchEvent(evt);

  
}

function simulateEnter(element) {
  const keydownEvent = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true,
    cancelable: true
  });
  element.dispatchEvent(keydownEvent);

  const keyupEvent = new KeyboardEvent('keyup', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true,
    cancelable: true
  });
  element.dispatchEvent(keyupEvent);
}


function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function setPhoneTypeWithDelay(type) {
  const phoneTypeButton = document.querySelector("#phoneNumber--phoneType");
  if (!phoneTypeButton) {
    showStatusMessage("Phone type button not found");
    return;
  }
  await delay(250);
  
  const parentElement = phoneTypeButton.parentElement;
  if (!parentElement) {
    showStatusMessage("Phone type parentElement not found");
    return;
  }

  const inputElement = parentElement.querySelector("input");
  if (!inputElement) {
    showStatusMessage("Phone type parentElement not found");
    return;
  }

  dispatchMouseClick(phoneTypeButton); // open dropdown
  await delay(400);

  const listBoxParentDiv = document.querySelector('div[data-popper-placement="bottom"]');
  showStatusMessage("Passed click!!!");
  if (!listBoxParentDiv) {
    showStatusMessage("Phone type listBoxDiv not found");
    return;
  }


  const listBoxDivChildren = listBoxParentDiv.children;
  if (!listBoxDivChildren) {
    showStatusMessage("Phone type listBoxDiv not found");
    return;
  }

  const listBox = listBoxDivChildren[0];
  if (!listBox) {
    showStatusMessage("Phone type listBox not found");
    return;
  }

  const options = Array.from(listBox.querySelectorAll('li[role="option"]'));
  let targetOption = options.find((opt) => {
    const div = opt.querySelector("div");
    return div && div.innerText.trim().toLowerCase() === type.toLowerCase();
  });

  if (!targetOption && type == "mobile") {
    type = "main";
    targetOption = options.find((opt) => {
    const div = opt.querySelector("div");
    return div && div.innerText.trim().toLowerCase() === type.toLowerCase();
  });
  }

  if (targetOption) {
    const targetOptionID = targetOption.getAttribute("data-value");
    const text = String(type);
    phoneTypeButton.textContent = text.charAt(0).toUpperCase() + text.slice(1);
    phoneTypeButton.setAttribute("value",targetOptionID);
  }
  
if (terminate) {
    showStatusMessage("Terminated!!!");
    return;
} // Stops further execution
}


async function fillStateIndia(userData) {
  if (!userData.stateIndia || userData.stateIndia === '') {
    showStatusMessage('No state selected in settings');
    return;
  }
  
  showStatusMessage(`Filling state: ${userData.stateIndia}`);
  
  // Target state dropdown buttons (matches your HTML)
  const stateButtons = document.querySelectorAll('button[name="countryRegion"]');
  
  if(stateButtons){
    for (const button of stateButtons) {
    
    // Click to open dropdown
    dispatchMouseClick(button);
    await new Promise(r => setTimeout(r, 200));
    
    // Find the SPECIFIC listbox opened by this button (matches aria-controls)
    const listboxId = button.getAttribute('aria-controls');
    const specificListbox = listboxId ? 
      document.querySelector(`#${listboxId}`) : 
      document.querySelector('ul[role="listbox"]:last-of-type');  // Most recent
    
    if (!specificListbox) {
      showStatusMessage('Listbox not found');
      continue;
    }
    
    const options = Array.from(specificListbox.querySelectorAll('li[role="option"], li'));

      showStatusMessage(options.length);


    const targetOption = options.find(option => 
      option.textContent.trim().toLowerCase().includes(
        userData.stateIndia.toLowerCase()
      )
    );

    if (targetOption) {
        dispatchMouseClick(targetOption);
        await new Promise(r => setTimeout(r, 300));
        button.textContent = userData.stateIndia;  // Update button display
        button.setAttribute('aria-label', `State ${userData.stateIndia} Required`);
        showStatusMessage(`✅ State: ${userData.stateIndia}`);
        return;
      }
    
    // Close dropdown if no match
    await new Promise(r => setTimeout(r, 200));
  }
    showStatusMessage(`❌ State not found: ${userData.stateIndia}`);
  }
  
  showStatusMessage("State field not present");
}


async function checkAgreementCheckbox(checkValue) {
    const checkbox = document.querySelector('input[type="checkbox"][data-automation-id="createAccountCheckbox"]');
    if (checkbox && checkValue) {
        //checkbox.checked = true;
        checkbox.dispatchEvent(new Event('input', { bubbles: true }));
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        checkbox.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    }
}




async function selectSearchableDropdown(searchValue, dropdownLabel = "How Did You Hear About Us?") {
  if (!searchValue || terminate) return;

  showStatusMessage(`🔍 ${dropdownLabel}: "${searchValue}"`);

  // 1. Find input NEAR the specific label
  const label = Array.from(document.querySelectorAll('label')).find(lb => 
    lb.textContent.toLowerCase().includes(dropdownLabel.toLowerCase())
  );

  let searchInput;
  if (label) {
    // Input near this label
    searchInput = label.closest('div').querySelector('input[placeholder="Search"]') ||
                  label.nextElementSibling?.querySelector('input') ||
                  label.parentElement.querySelector('input[id*="source"]');
  }

  try{
    if (searchInput.getAttribute('type') === 'text') {
      return;
    }
  }

  catch{
    return;
  }
  

  // Fallback: all searchable inputs, pick by context
  if (!searchInput) {
    const candidates = document.querySelectorAll('input[placeholder="Search"], input[data-uxi-multiselect-id]');
    searchInput = Array.from(candidates).find(input => {
      const containerText = input.closest('[data-automation-id*="formField"]').textContent;
      return containerText.toLowerCase().includes('hear') || 
             input.id.includes('source');
    });
  }

  if (!searchInput) {
    showStatusMessage(`❌ ${dropdownLabel} input not found`);
    return;
  }

  // 2. Type & Enter
  searchInput.focus();
  searchInput.value = searchValue;
  searchInput.dispatchEvent(new Event('input', { bubbles: true }));

  simulateEnter(searchInput);
  await new Promise(r => setTimeout(r, 800));

  // 3. Check auto-select OR pick from dropdown (same as before)
  const selectedPill = searchInput.closest('div').querySelector('[data-automation-id="selectedItem"]');
  if (selectedPill && selectedPill.textContent.toLowerCase().includes(searchValue.toLowerCase())) {
    showStatusMessage(`✅ ${dropdownLabel}: ${searchValue}`);
    return;
  }

  // 4. Select from dropdown near THIS input
  const activeListbox = document.querySelector(`
  div[data-automation-id="activeListContainer"],
  .ReactVirtualized__Grid.ReactVirtualized__List[role="listbox"],
  div[class*="ReactVirtualized__Grid"][role="listbox"]
`);
  if (activeListbox && searchInput.closest('div')) {
    const options = Array.from(activeListbox.querySelectorAll(`
  div[role="option"][data-automation-id="menuItem"],
  div.css-542lz9,
  div[id^="menuItem-"][role="option"]
`));
    let bestMatch = options.find(opt => opt.textContent.toLowerCase().includes(searchValue.toLowerCase())) ||
                    options.find(opt => opt.getAttribute('aria-selected') === 'true') ||
                    options[0];
    
    if (bestMatch) {
      dispatchMouseClick(bestMatch.querySelector('input[type="radio"]') || bestMatch);
      showStatusMessage(`✅ ${dropdownLabel}: ${bestMatch.textContent.trim()}`);
    }
  }
  await new Promise(r => setTimeout(r, 2000));

}






async function selectHearAboutSource(userInput) {
  if (!userInput) return;

  const normalizedInput = userInput.trim().toLowerCase();

  // Hear About lookup map (user choice → Workday options array)
  const hearAboutMap = {

    "linkedin": ["linkedin", "social media - linkedin"],
    "glassdoor": ["glassdoor", "social media - glassdoor"],
    "naukri": ["naukri", "Job Board - Naukri"],
    "indeed": ["indeed","job board - indeed"],
    "handshake": ["handshake","job board - handshake"],
    "twitter/x": ["twitter", "social media - twitter"],
    "google search": ["google", "search engine"],
    "company website": ["company website", "our website"],
    "instagram": ["instagram", "social media - instagram"],
    "facebook": ["facebook", "social media - facebook"],
    "tik tok": ["tiktok"],
    "other": ["other"]
  };

  // Find matching Workday labels for this user input
  let possibleValues = [];
  if (hearAboutMap[normalizedInput]) {
    possibleValues = hearAboutMap[normalizedInput];
  } else {
    possibleValues = [normalizedInput];
  }

  // Find source dropdown containers
  const sourceContainers = document.querySelectorAll(`
    button[aria-label*="Hear About"]
  `);

  
  for (let i=0; i<sourceContainers.length; i++) {
    // Verify it's the right dropdown (text check)
    let btn = sourceContainers[i];
    const btnText = btn.textContent.trim().toLowerCase();
    showStatusMessage("Iteration",i);
    showStatusMessage(btnText);
    if (!btnText.includes("select one") && !btnText.includes("select")) continue;

    if (btn.tagName !== 'BUTTON') continue;
    

    // Click to open
    dispatchMouseClick(btn);
    await new Promise(r => setTimeout(r, 100));

    
    // 3. Wait & capture the ACTIVE listbox

    let options = null;

    // 3. Wait & capture the ACTIVE listbox
  const activeListbox = Array.from(document.querySelectorAll('ul[role="listbox"], [role="listbox"]'))
      .find(lb => lb.getAttribute('aria-activedescendant') === 'select-one');

    console.log(activeListbox);

    if (!activeListbox) {
      console.log('❌ Active listbox not found');
      return null;
    }

    // 4. Extract ALL options
    //options = Array.from(activeListbox.querySelectorAll('li[role="option"], [data-automation-id="promptOption"]'))
      //.map((opt, index) => ({
        //index,
        //text: opt.textContent.trim(),
        //value: opt.getAttribute('data-value'),
        //id: opt.id
      //}));

      options = Array.from(activeListbox.querySelectorAll('li[role="option"], [data-automation-id="promptOption"]'));

      // ✅ Skip this dropdown if it contains "Main" option (phone type dropdown)
if (options.some(opt => opt.textContent?.trim().toLowerCase().includes('main'))) {
  console.log('⏭️ Skipping "Main" dropdown (phone type)');1
  continue; // Go to next iteration of loop
}

    console.log('📋 Hear About Dropdown Options:', options);
    
    result =  {
      button: btn.outerHTML,
      listbox: activeListbox.outerHTML,
      options: options
    }

    // Get options
    //let options = Array.from(document.querySelectorAll(`
      //li[role="option"], 
      //[data-automation-id="promptOption"],
      //div[data-value]
    //`));

    // Try all possible values (in order)
    showStatusMessage(options.length);
    let foundOption = null;
    for (const val of possibleValues) {
      foundOption = options.find(opt => {
        const optText = opt.textContent?.trim().toLowerCase() || 
                       opt.getAttribute('aria-label')?.toLowerCase() || '';
        return optText.includes(val);
      });
      if (foundOption) break;
    }

    // Company website special case
    if (normalizedInput === "company website" && !foundOption) {
      foundOption = options.find(opt => 
        opt.textContent?.toLowerCase().includes("career") ||
        opt.textContent?.toLowerCase().includes("company website")
      );
    }

    if (foundOption) {
      const clickable = foundOption.closest('[role="menuitem"]') || foundOption.closest('li') || foundOption;
      showStatusMessage("1");
      console.log(clickable);
      dispatchMouseClick(clickable);
      await new Promise(r => setTimeout(r, 300));
      showStatusMessage(`✅ Hear about: ${foundOption.textContent.trim()}`);
      return;
    }

    // Other fallback (only if not explicitly "Other")
    if (!foundOption && normalizedInput !== "other") {
      foundOption = options.find(opt => 
        opt.textContent?.toLowerCase().includes("other")
      );
    }

    if (foundOption) {
      const clickable = foundOption.closest('[role="menuitem"]') || foundOption.closest('li') || foundOption;
      showStatusMessage("2");
      dispatchMouseClick(clickable);
      await new Promise(r => setTimeout(r, 300));
      showStatusMessage(`✅ Hear about: ${foundOption.textContent.trim()}`);
      return;
    }

    if (!foundOption) {
      foundOption = options.find(opt => 
        opt.textContent?.toLowerCase().includes("linkedin")
      );
    }

    if (foundOption) {
      const clickable = foundOption.closest('[role="menuitem"]') || foundOption.closest('li') || foundOption;
      showStatusMessage("3");
      dispatchMouseClick(clickable);
      await new Promise(r => setTimeout(r, 300));
      showStatusMessage(`✅ Hear about: ${foundOption.textContent.trim()}`);
      return;
    }

  }

  showStatusMessage(`❌ No match for '${userInput}'. Tried: ${possibleValues.join(', ')}`);
}


async function clickAddWorkExperience(times) {
  const workExpSection = await waitForElement('div[role="group"][aria-labelledby="Work-Experience-section"]');
  if (!workExpSection) {
    showStatusMessage('Work Experience section not found.');
    return;
  }
  const addButton = workExpSection.querySelector('button[data-automation-id="add-button"]');
  if (!addButton) {
    showStatusMessage('Add button not found inside Work Experience section.');
    return;
  }
  for (let i = 0; i < times; i++) {
    dispatchMouseClick(addButton);
    await new Promise(resolve => setTimeout(resolve, 600));
  }
  // Usage example (insert in your main routines and loops):
if (terminate) {
    showStatusMessage("Terminated!!!");
    return;
} // Stops further execution
}

async function fillWorkExperiences(userData) {
  const section = await waitForElement(
    'div[role="group"][aria-labelledby="Work-Experience-section"]'
  );
  if (!section) {
    showStatusMessage("Work Experience section not found");
    return;
  }
  const entries = Array.from(section.querySelectorAll('div[role="group"]')).filter((div) => {
    const label = div.getAttribute("aria-labelledby") || "";
    return label.startsWith("Work-Experience-") && label !== "Work-Experience-section";
  });
  if (!entries.length) {
    showStatusMessage("No work experience entries found");
    return;
  }
  for (let i = 0; i < 3; i++) {
    const entry = entries[i];
    if (!entry) continue;
    await fillField(entry.querySelector('input[name="jobTitle"]'), userData[`jobTitle${i + 1}`] || "");
    await fillField(entry.querySelector('input[name="companyName"]'), userData[`company${i + 1}`] || "");
    await fillField(entry.querySelector('input[name="location"]'), userData[`location${i + 1}`] || "");
    await fillField(entry.querySelector('input[name="currentlyWorkHere"]'), !!userData[`current${i + 1}`]);
    const fromMonth = entry.querySelector('input[id$="startDate-dateSectionMonth-input"]');
    const fromYear = entry.querySelector('input[id$="startDate-dateSectionYear-input"]');
    if (fromMonth && fromYear && userData[`from${i + 1}`]) {
      const [month, year] = userData[`from${i + 1}`].split("/");
      await fillField(fromMonth, month);
      await fillField(fromYear, year);
    }
    const toMonth = entry.querySelector('input[id$="endDate-dateSectionMonth-input"]');
    const toYear = entry.querySelector('input[id$="endDate-dateSectionYear-input"]');
    if (toMonth && toYear && userData[`to${i + 1}`]) {
      const [month, year] = userData[`to${i + 1}`].split("/");
      await fillField(toMonth, month);
      await fillField(toYear, year);
    }
    await fillField(entry.querySelector('textarea[id$="roleDescription"]'), userData[`desc${i + 1}`] || '');
  }
  // Usage example (insert in your main routines and loops):
if (terminate) {
    showStatusMessage("Terminated!!!");
    return;
} // Stops further execution
}


//EDUCATION SECTION
async function clickAddEducation(times) {
  const educationSection = await waitForElement('div[role="group"][aria-labelledby="Education-section"]');
  if (!educationSection) {
    showStatusMessage("Education section not found.");
    return;
  }

  const addButton = educationSection.querySelector('button[data-automation-id="add-button"]');
  if (!addButton) {
    showStatusMessage("Add button not found inside Education section.");
    return;
  }

  for (let i = 0; i < times; i++) {
    dispatchMouseClick(addButton);
    await new Promise(resolve => setTimeout(resolve, 600));
  }
}

async function resolveUniversityAcronym(universityName) {
  let words = universityName.split(" ").filter(
    w => w && !["deemed", "university", "of", "and"].includes(w.toLowerCase())
  );
  let acronym = words.map(w => w[0]).join("").toUpperCase() + " University";
  return acronym;
}


// DEGREE MAPPING - Add at top of file with other constants
// YOUR EXACT Input Form Options → Company Alternates
const DEGREE_MAPPING = {
  // Input Form Primary → Company Alternates
  'High School or GED (+-11 years of education)': [
    'High School or GED (+-11 years of education)', 
    'High School, GED', 'High School Diploma or Equivalent', 'Graduate', 
    'High School', 'H.S. - High School'
  ],
  
  'Technical Diploma (+-12 years of education)': [
    'Technical Diploma (+-12 years of education)', 'Diploma', 'Technical Diploma'
  ],
  
  'Associates (+-13 years of education)': [
    'Associates (+-13 years of education)', 'Associate of Arts', 'Associate of Science', 
    "Associate's Degree or Equivalent", 'Associates', "A. - Associate's degree"
  ],
  
  'Bachelor of Arts': [
    'Bachelor of Arts', "Bachelors (+-16 years of education)", "Bachelor's Degree or Equivalent",
    'Under Graduate', 'Bachelors', 'Bachelor', "B. -Bachelor's degree"
  ],
  
  'Bachelor of Commerce': [
    'Bachelor of Commerce', "Bachelors (+-16 years of education)", "Bachelor's Degree or Equivalent",
    'Under Graduate', 'Bachelors', 'Bachelor', "B. -Bachelor's degree"
  ],
  
  'Bachelor of Engineering': [
    'Bachelor of Engineering', "Bachelors (+-16 years of education)", "Bachelor's Degree or Equivalent",
    'Under Graduate', 'Bachelors', 'Bachelor', "B. -Bachelor's degree"
  ],
  
  'Bachelor of Science': [
    'Bachelor of Science', "Bachelors (+-16 years of education)", "Bachelor's Degree or Equivalent",
    'Under Graduate', 'Bachelors', 'Bachelor', "B. -Bachelor's degree"
  ],
  
  'Post Graduate Diploma': ['Post Graduate Diploma'],
  
  'Master of Arts': [
    'Master of Arts', "Masters (+-18 years of education)", "Master's Degree or Equivalent",
    'Master', 'Masters', 'M. - Masters degree'
  ],
  
  'Masters of Business Administration': [
    'Masters of Business Administration', "Masters (+-18 years of education)", "Master's Degree or Equivalent",
    'Master', 'Masters', 'M. - Masters degree'
  ],
  
  'Master of Science': [
    'Master of Science', "Masters (+-18 years of education)", "Master's Degree or Equivalent",
    'Master', 'Masters', 'M. - Masters degree'
  ],
  
  'Master of Public Policy': [
    'Master of Public Policy', "Masters (+-18 years of education)", "Master's Degree or Equivalent",
    'Master', 'Masters', 'M. - Masters degree'
  ],
  
  'Doctor of Education': [
    'Doctor of Education', 'Doctorate (over 19 years of education)', 'Doctorate Degree or Equivalent',
    'Doctrate', 'Ph.D. - Doctor of Philosophy'
  ],
  
  'Doctor of Philosophy': [
    'Doctor of Philosophy', 'Doctorate (over 19 years of education)', 'Doctorate Degree or Equivalent',
    'Doctrate', 'Ph.D. - Doctor of Philosophy'
  ],
  
  'Other': ['Other', 'Other (other type of degree or diploma)']
};


// ❌ OPTIONS TO AVOID (Partial/Incomplete degrees)
const BLACKLIST = [
  'Partial Bachelor', 'Partial Master', 'Partial Doctorate', 'Partial Associate',
  'Higher National Certificate', 'Degree In Progress', 'Result Awaited', 
  'Non Degree Seeking', 'No Final Degree Received', 'Degree None', 'Professional Doctorate', 'Medical Doctorate', 'Doctorate Awarded'
];

async function selectEducationDegree(entry, userDegree) {
  if (!userDegree || !entry) return false;

  const targetOptions = DEGREE_MAPPING[userDegree];
  if (!targetOptions) {
    showStatusMessage(`No mapping for: ${userDegree}`);
    return false;
  }

  const degreeButton = entry.querySelector(`
    [data-automation-id="formField-degree"] button,
    button[name="degree"], button[id*="-degree"],
    button[aria-label*="Degree"], button[aria-haspopup="listbox"]
  `);

  if (!degreeButton) {
    showStatusMessage('Degree button not found');
    return false;
  }

  dispatchMouseClick(degreeButton);
  await delay(800);

  const listbox = document.querySelector('ul[role="listbox"][aria-required="true"]') ||
                  Array.from(document.querySelectorAll('ul[role="listbox"]'))
                    .find(lb => lb.closest('[data-behavior-click-outside-close]'));

  if (!listbox) {
    showStatusMessage('Listbox not found');
    return false;
  }

  // Filter out blacklisted options FIRST
  const validOptions = Array.from(listbox.querySelectorAll('li[role="option"]'))
    .filter(opt => {
      const optText = (opt.querySelector('div')?.textContent || opt.textContent).trim().toLowerCase();
      return !BLACKLIST.some(blacklisted => optText.includes(blacklisted.toLowerCase()));
    });

  // ✅ STEP 1: EXACT MATCH FIRST
  const exactMatch = validOptions.find(opt => {
    const optText = (opt.querySelector('div')?.textContent || opt.textContent).trim();
    return optText === userDegree || optText.toLowerCase() === userDegree.toLowerCase();
  });

  if (exactMatch) {
    dispatchMouseClick(exactMatch);
    const displayText = (exactMatch.querySelector('div')?.textContent || exactMatch.textContent).trim();
    showStatusMessage(`✅ EXACT: ${displayText}`);
    await updateDegreeUI(degreeButton, exactMatch);
    return true;
  }

  // ✅ STEP 2: Then alternates (in your specified order)
  for (const target of targetOptions.slice(1)) {  // Skip exact (index 0)
    const match = validOptions.find(opt => {
      const optText = (opt.querySelector('div')?.textContent || opt.textContent).trim();
      const targetLower = target.toLowerCase();
      const optLower = optText.toLowerCase();
      
      return optLower.includes(targetLower.split(' ')[0]) ||
             targetLower.includes(optLower.split(' ')[0]);
    });
    
    if (match) {
      dispatchMouseClick(match);
      const displayText = (match.querySelector('div')?.textContent || match.textContent).trim();
      showStatusMessage(`✅ ${displayText}`);
      await updateDegreeUI(degreeButton, match);
      return true;
    }
  }

  // STEP 3: Other fallback
  const otherMatch = validOptions.find(opt => {
    const optText = (opt.querySelector('div')?.textContent || opt.textContent).trim().toLowerCase();
    return optText.includes('other');
  });
  
  if (otherMatch) {
    dispatchMouseClick(otherMatch);
    showStatusMessage(`🔄 Other: ${userDegree}`);
    await updateDegreeUI(degreeButton, otherMatch);
    return true;
  }

  showStatusMessage(`❌ No match: ${userDegree}`);
  return false;
}

// Helper to update UI
async function updateDegreeUI(degreeButton, selectedOption) {
  const hiddenInput = degreeButton.parentElement?.querySelector('input[type="text"]');
  if (hiddenInput) hiddenInput.value = selectedOption.getAttribute('data-value') || '';
  
  const displayText = (selectedOption.querySelector('div')?.textContent || selectedOption.textContent).trim();
  degreeButton.textContent = displayText;
  degreeButton.setAttribute('value', selectedOption.getAttribute('data-value') || '');
  degreeButton.setAttribute('aria-label', `Degree ${displayText} Required`);
  
  await delay(400);
  await saveMessageLog(`Degree selected: ${displayText}`);
}


//EDUCATION SECTION
async function clickAddEducation(times) {
  const educationSection = await waitForElement('div[role="group"][aria-labelledby="Education-section"]');
  if (!educationSection) {
    showStatusMessage("Education section not found.");
    return;
  }

  const addButton = educationSection.querySelector('button[data-automation-id="add-button"]');
  if (!addButton) {
    showStatusMessage("Add button not found inside Education section.");
    return;
  }

  for (let i = 0; i < times; i++) {
    dispatchMouseClick(addButton);
    await new Promise(resolve => setTimeout(resolve, 600));
  }
}


async function fillEducationSection(userData) {
  const section = await waitForElement('div[role="group"][aria-labelledby="Education-section"]');
  if (!section) {
    showStatusMessage("Education section not found");
    return;
  }

  // Get existing entries
  const entries = Array.from(section.querySelectorAll('div[role="group"]')).filter(div => {
    const label = div.getAttribute("aria-labelledby");
    return label?.startsWith("Education-") && label !== "Education-section";
  });

  // Prepare user education data
  const educations = (userData.education || []).filter(
    e => e.schoolName || e.degree).map(e => ({
  ...e,
  gpa: e.gpa || userData[`gpa${(userData.education || []).indexOf(e) + 1}`]  // Fallback to flat storage
})) .filter(e => e.schoolName || e.degree);

  if (!educations.length) {
    showStatusMessage("No education data found in user settings.");
    return;
  }

  const timesToAdd = Math.max(0, educations.length - entries.length);
  await clickAddEducation(timesToAdd);

  await new Promise(resolve => setTimeout(resolve, 800));
  const updatedEntries = Array.from(section.querySelectorAll('div[role="group"]')).filter(div => {
    const label = div.getAttribute("aria-labelledby");
    return label?.startsWith("Education-") && label !== "Education-section";
  });


async function findUniversityOption(labelText) {
  showStatusMessage("Entered found function!");
  return Array.from(
    document.querySelectorAll("div[data-automation-id='menuItem']")
  ).find(menuItem => {
    const labelDiv = menuItem.querySelector("div[data-automation-id='promptOption']");
    return labelDiv && labelDiv.textContent.trim() === labelText;
  });
}

  for (let i = 0; i < educations.length; i++) {
    showStatusMessage("Count"+i);
    const entry = updatedEntries[i];
    const data = educations[i];
    if (!entry) continue;

    let schoolField = entry.querySelector('[data-automation-id="formField-schoolName"] input, [data-automation-id="searchBox"]');
    let type = "textBox";

    if (!schoolField) {
      schoolField = entry.querySelector('[data-automation-id="formField-schoolName"],[placeholder="Search"]');
      type = "searchBox";
    }

    if (schoolField) {

      if (type==="textBox") {
        // Plain text input
        await fillField(schoolField, data.schoolName);
      } else {
        // Searchable dropdown
        dispatchMouseClick(schoolField);
        await new Promise(resolve => setTimeout(resolve, 400));

        schoolField.focus();
        schoolField.value = data.schoolName;
        schoolField.dispatchEvent(new Event("input", { bubbles: true }));
        schoolField.dispatchEvent(new Event("change", { bubbles: true }));
        simulateEnter(schoolField);
        dispatchMouseClick(schoolField);

        await new Promise(resolve => setTimeout(resolve, 700));
        let option = "";
        option = Array.from(document.querySelectorAll("li[data-automation-id='menuItem']"))  // Target the specific li elements
  .find(li => {
    const pElement = li.querySelector("p[data-automation-id='promptOption']");  // Find p inside li
    return pElement && pElement.textContent.trim() === data.schoolName;  // Exact match check
  });

        //Remove
        showStatusMessage("Option::");
        showStatusMessage(option);

        let alternate = "";

        if (option) {
          //dispatchMouseClick(option);
          showStatusMessage("Selected " + data.schoolName);
          //simulateEnter(schoolField);
          await new Promise(resolve => setTimeout(resolve, 700));

          // Try direct radio selection
          //found = await selectSearchableDropdownRadio(data.schoolName);
          //showStatusMessage("Found::");
          //showStatusMessage(found);
          // If not found, try acronym fallback
          //if (!found) {
           //let alternate = await resolveUniversityAcronym(data.schoolName);
           //found = await selectSearchableDropdownRadio(alternate);
          //}
          // If still not found, try "Other"
          //if (!found) {
            //found = await selectSearchableDropdownRadio("Other");
          //}
        }

        else{
          showStatusMessage("INSIDE ELSE  ");
          alternate = await resolveUniversityAcronym(data.schoolName);
          schoolField.focus();
          schoolField.value = alternate;
          schoolField.dispatchEvent(new Event("input", { bubbles: true }));
          schoolField.dispatchEvent(new Event("change", { bubbles: true }));
          simulateEnter(schoolField);
          dispatchMouseClick(schoolField);
          await new Promise(resolve => setTimeout(resolve, 700));

          let option = "";
        option = Array.from(document.querySelectorAll("li[data-automation-id='menuItem']"))  // Target the specific li elements
  .find(li => {
    const pElement = li.querySelector("p[data-automation-id='promptOption']");  // Find p inside li
    return pElement && pElement.textContent.trim() ===alternate;  // Exact match check
  });

          if (option) {
            //dispatchMouseClick(option);
            showStatusMessage("Selected " + alternate);
            //simulateEnter(schoolField);
            await new Promise(resolve => setTimeout(resolve, 700));
          }
        
          else{
            let found = await findUniversityOption(alternate);
            showStatusMessage(found);
            if (found) {
              const radio = found.querySelector("input[data-automation-id='radioBtn']");
              if (radio) radio.click();  // selects the option
              showStatusMessage("ALTERNATE!");
            }

          
          
            // If still not found, try "Other"
            else{
              schoolField.focus();
              schoolField.value = "Other";
              schoolField.dispatchEvent(new Event("input", { bubbles: true }));
              schoolField.dispatchEvent(new Event("change", { bubbles: true }));
              simulateEnter(schoolField);
              await new Promise(resolve => setTimeout(resolve, 700));
              found = await findUniversityOption("Other");
              if (found) {
                const radio = found.querySelector("input[data-automation-id='radioBtn']");
                if (radio) radio.click();  // selects the option
                showStatusMessage("Found Other!");
              }
              else{
                showStatusMessage("Option not found:"+data.schoolName);
              }
            }
          }
        }
      }
    }

    // Fill degree, start and end date if any
    //await fillField(entry.querySelector('input[name="degree"]'), data.degree);
    await selectEducationDegree(entry,data.degree)

    // ← ADD GPA CODE HERE
    const gradeAvgField = entry.querySelector('input[name="gradeAverage"]');
    if (gradeAvgField &&  data.degree && !gradeAvgField.value.trim()) {
      await fillField(gradeAvgField, data.gpa || userData[`gpa${i + 1}`]);
      showStatusMessage(`GPA filled: ${data.gpa || userData[`gpa${i + 1}`]}`);
    }

    //From and To dates section

    if (!data.from && !data.to) continue; // Skip if no dates


    // Helper function to extract month and year
    const parseDate = (dateStr) => {
      if (!dateStr) return { month: null, year: null };
      
      // Input format: MM/YYYY
      const parts = dateStr.split('/');
      if (parts.length === 2) {
        return {
          month: parts[0].trim(),
          year: parts[1].trim()
        };
      }
      
      // Fallback: just year
      return {
        month: null,
        year: dateStr.trim()
      };
    };

    // FILL "FROM" DATE
    if (data.from) {
      const { month, year } = parseDate(data.from);
      
      // Try to find date input fields (MM/YYYY format)
      let fromMonthInput = entry.querySelector('input[id*="startDate"][id*="Month"], input[placeholder*="MM"]');
      let fromYearInput = entry.querySelector('input[id*="startDate"][id*="Year"], input[placeholder*="YYYY"]');

      if (fromMonthInput && fromYearInput) {
        // Date field with separate month/year inputs
        if (month) {
          await fillField(fromMonthInput, month);
          await delay(250);
        }
        if (year) {
          await fillField(fromYearInput, year);
          await delay(250);
        }
        showStatusMessage(`✅ From Date: ${month || ''}/${year || ''}`);
      } else {
        // Try to find single text input (YYYY format only)
        //let fromInput = entry.querySelector('input[id*="startDate"], input[name*="from"], input[name*="start"]');
        let fromInput = entry.querySelector('input[id$="firstYearAttended-dateSectionYear-input"]');
        
        if (!fromInput) {
          // Fallback: search for date input by aria-label or placeholder
          fromInput = Array.from(entry.querySelectorAll('input')).find(inp => {
            const label = inp.getAttribute('aria-label') || inp.getAttribute('placeholder') || '';
            return label.toLowerCase().includes('from') || label.toLowerCase().includes('start');
          });
        }

        if (fromInput) {
          // Check if it's expecting year only (type=text, pattern=\d{4})
          const pattern = fromInput.getAttribute('pattern');
          //const fillValue = pattern === '\\d{4}' ? year : (month && year ? `${month}/${year}` : year);
          const fillValue = pattern === '\\d{4}' ? (month && year ? `${month}/${year}` : year) : year;
          
          await fillField(fromInput, fillValue);
          showStatusMessage(`✅ From Date: ${fillValue}`);
        }
      }
    }

    // FILL "TO" DATE
    if (data.to) {
      const { month, year } = parseDate(data.to);
      
      // Try to find date input fields (MM/YYYY format)
      let toMonthInput = entry.querySelector('input[id*="endDate"][id*="Month"], input[id*="endDate"][id*="month"]');
      let toYearInput = entry.querySelector('input[id*="endDate"][id*="Year"], input[id*="endDate"][id*="year"]');

      if (toMonthInput && toYearInput) {
        // Date field with separate month/year inputs
        if (month) {
          await fillField(toMonthInput, month);
          await delay(250);
        }
        if (year) {
          await fillField(toYearInput, year);
          await delay(250);
        }
        showStatusMessage(`✅ To Date: ${month || ''}/${year || ''}`);
      } else {
        // Try to find single text input (YYYY format only)
        //let toInput = entry.querySelector('input[id*="endDate"], input[name*="to"], input[name*="end"]');
          let toInput = entry.querySelector('input[id$="lastYearAttended-dateSectionYear-input"]');
        
        if (!toInput) {
          // Fallback: search for date input by aria-label or placeholder
          toInput = Array.from(entry.querySelectorAll('input')).find(inp => {
            const label = inp.getAttribute('aria-label') || inp.getAttribute('placeholder') || '';
            return label.toLowerCase().includes('to') || label.toLowerCase().includes('end');
          });
        }

        if (!toInput) {
          showStatusMessage("Date Field not found");
        }

        if (toInput) {
          // Check if it's expecting year only
          const pattern = toInput.getAttribute('pattern');
          //const fillValue = pattern === '\\d{4}' ? year : (month && year ? `${month}/${year}` : year);
          const fillValue = pattern === '\\d{4}' ? (month && year ? `${month}/${year}` : year): year;
          
          await fillField(toInput, fillValue);
          showStatusMessage(`✅ To Date: ${fillValue}`);
        }
      }
    }

    await delay(300);
    showStatusMessage("Education dates filled!");

  }
  showStatusMessage("Education section autofill complete!");
}




async function fillWebsiteURLsDynamic(urls = []) {
  if (!Array.isArray(urls) || !urls.length) return;
  const websitesContainer = document.querySelector(
    'div[role="group"][aria-labelledby^="Websites-section"]'
  );
  if (!websitesContainer) {
    showStatusMessage("Websites container not found");
    return;
  }
  const addBtn = Array.from(websitesContainer.querySelectorAll("button")).find(
    (btn) => btn.innerText && btn.innerText.trim().toLowerCase() === "add"
  );
  if (!addBtn) {
    showStatusMessage("Add button not found");
    return;
  }
  for (let i = 0; i < urls.length; i++) {
    addBtn.click();
    await new Promise((r) => setTimeout(r, 500));
  }
  const urlInputs = websitesContainer.querySelectorAll('input[type="text"][name="url"]');
  urls.forEach((url, i) => {
    if (urlInputs[i]) {
      urlInputs[i].value = url;
      urlInputs[i].dispatchEvent(new Event("input", { bubbles: true }));
      urlInputs[i].dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
  // Usage example (insert in your main routines and loops):
if (terminate) {
    showStatusMessage("Terminated!!!");
    return;
} // Stops further execution
}

async function fillSocialNetworkUrls(userData) {
  const socialNetworks = {
    linkedInAccount: userData.linkedInUrl,
    twitterAccount: userData.twitterUrl
  };
  

  for (const [fieldName, url] of Object.entries(socialNetworks)) {
    if (!url) continue;

    const selector = `input[name="${fieldName}"]`;
    const field = await waitForElement(selector, 5000);

    if (field) {
      field.value = url;
      field.dispatchEvent(new Event('input', { bubbles: true }));
      field.dispatchEvent(new Event('change', { bubbles: true }));
      //showStatusMessage(`Filled ${fieldName} with: ${url}`);
      await saveMessageLog(`Filled ${fieldName}`);
    } else {
      //showStatusMessage(`${fieldName} field not found`);
      await saveMessageLog(`${fieldName} field not found`);
    }
  }
  // Usage example (insert in your main routines and loops):
if (terminate) {
    showStatusMessage("Terminated!!!");
    return;
} // Stops further execution
}





async function fillSkillsSection(skillsList) {
  if (!Array.isArray(skillsList) || skillsList.length === 0) return;

  const searchInput = document.getElementById('skills--skills');
  if (!searchInput) {
    showStatusMessage("Skills input not found");
    return;
  }

  for (const skill of skillsList) {
    // Type the skill
    searchInput.focus();
    searchInput.value = skill;
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    searchInput.dispatchEvent(new Event('change', { bubbles: true }));

    // Click the search box to force dropdown open
    simulateEnter(searchInput);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Wait for dropdown and select option
    const leafNode = await waitForElement(`[data-automation-id="promptLeafNode"] [data-automation-label="${skill}"]`, 3000);
    if (leafNode) {
      const checkbox = leafNode.closest('[data-automation-id="promptLeafNode"]').querySelector('input[type="checkbox"]');
      if (checkbox && !checkbox.checked) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('input', { bubbles: true }));
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        dispatchMouseClick(checkbox);
        showStatusMessage(`Selected: ${skill}`);
      }
    } else {
      showStatusMessage(`Skill not found: ${skill}`);
    }

    await new Promise(resolve => setTimeout(resolve, 600));


    // Click the search box to open dropdown
    dispatchMouseClick(searchInput);
    await new Promise(resolve => setTimeout(resolve, 500));

    searchInput.value = skill;
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    dispatchMouseClick(searchInput); // This opens the dropdown
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}





async function clickAddLanguage(times) {
  const languageSection = await waitForElement('div[role="group"][aria-labelledby="Languages-section"]');
  if (!languageSection) {
    showStatusMessage('Languages section not found.');
    return;
  }
  
  const addButton = languageSection.querySelector('button[data-automation-id="add-button"]');
  if (!addButton) {
    showStatusMessage('Add button not found inside Languages section.');
    return;
  }
  
  for (let i = 0; i < times; i++) {
    dispatchMouseClick(addButton);
    await new Promise(resolve => setTimeout(resolve, 600));
  }
}

async function fillLanguagesSection(userData) {

  // Step 1: Get user input
  const languagesInput = userData.languagesInput?.trim();
  if (!languagesInput) {
    showStatusMessage('No languages provided in user data.');
    return;
  }
  
  const languages = languagesInput.split(',').map(lang => lang.trim()).filter(Boolean);
  if (languages.length === 0) {
    showStatusMessage('No valid languages found.');
    return;
  }
  
  // Extract other language-related data
  const nativeLanguages = userData.nativeLanguagesInput?.split(',').map(lang => lang.trim()).filter(Boolean) || [];
  const comprehension = userData.comprehensionProficiency?.split(',').map(p => p.trim()).filter(Boolean) || [];
  const overall = userData.overallProficiency?.split(',').map(p => p.trim()).filter(Boolean) || [];
  const reading = userData.readingProficiency?.split(',').map(p => p.trim()).filter(Boolean) || [];
  const speaking = userData.speakingProficiency?.split(',').map(p => p.trim()).filter(Boolean) || [];
  const writing = userData.writingProficiency?.split(',').map(p => p.trim()).filter(Boolean) || [];

  // Step 2: Click on add button the same number of times as languages
  const languageSection = await waitForElement('div[role="group"][aria-labelledby="Languages-section"]');
  if (!languageSection) {
    showStatusMessage('Languages section not found.');
    return;
  }
  
  const addButton = languageSection.querySelector('button[data-automation-id="add-button"]');
  if (!addButton) {
    showStatusMessage('Add button not found inside Languages section.');
    return;
  }
  
  // Click add button for each additional language (first one exists by default)
  const existingEntries = Array.from(languageSection.querySelectorAll('div[role="group"]'))
    .filter(div => {
      const label = div.getAttribute('aria-labelledby');
      return label?.startsWith('Languages-') && label !== 'Languages-section';
    });
  
  const additionalClicks = languages.length - existingEntries.length;
  for (let i = 0; i < additionalClicks; i++) {
    dispatchMouseClick(addButton);
    await new Promise(resolve => setTimeout(resolve, 600));
  }
  
  // Wait for entries to be created
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Get all language entries
  const entries = Array.from(languageSection.querySelectorAll('div[role="group"]'))
    .filter(div => {
      const label = div.getAttribute('aria-labelledby');
      return label?.startsWith('Languages-') && label !== 'Languages-section';
    });
  
  if (entries.length === 0) {
    showStatusMessage('No language entries found after adding.');
    return;
  }
  
  // Step 3: Select each dropdown and choose correct option
  for (let i = 0; i < languages.length && i < entries.length; i++) {
    const entry = entries[i];
    if (!entry) continue;
    
    // Fill language dropdown
    const languageButton = entry.querySelector('button[id*="--language"]');
    if (languageButton) {
      // Click to open dropdown
      dispatchMouseClick(languageButton);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Wait for the popper element to appear and find the listbox
      const listbox = await waitForElement('ul[role="listbox"][aria-required="true"]', 2000);
      if (listbox) {
        const languageText = languages[i];
        const option = Array.from(listbox.querySelectorAll('li[data-value]'))
          .find(li => li.textContent.trim().toLowerCase() === languageText.toLowerCase());
        
        if (option) {
          dispatchMouseClick(option);
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
    }
    
    // Fill native language checkbox
    const nativeCheckbox = entry.querySelector('input[name="native"]');
    if (nativeCheckbox && nativeLanguages.includes(languages[i])) {
      //nativeCheckbox.checked = true;
      //nativeCheckbox.dispatchEvent(new Event('input', { bubbles: true }));
      //nativeCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
      dispatchMouseClick(nativeCheckbox);
    }
    
    // Fill proficiency fields
    const proficiencyFields = [
      { name: 'Comprehension', value: comprehension[i] || 'Intermediate' },
      { name: 'Overall', value: overall[i] || 'Intermediate' },
      { name: 'Reading', value: reading[i] || 'Intermediate' },
      { name: 'Speaking', value: speaking[i] || 'Intermediate' },
      { name: 'Writing', value: writing[i] || 'Intermediate' }
    ];
    
    for (const field of proficiencyFields) {
      const fieldButton = entry.querySelector(`button[aria-label="${field.name} Select One Required"]`);
      if (fieldButton) {
        // Click to open dropdown
        dispatchMouseClick(fieldButton);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Wait for the popper element to appear and find the listbox
        const listbox = await waitForElement(`ul[role="listbox"][aria-required="true"]`, 2000);
        if (listbox) {
          const option = Array.from(listbox.querySelectorAll('li[data-value]'))
            .find(li => li.textContent.trim() === field.value);
          
          if (option) {
            dispatchMouseClick(option);
            await new Promise(resolve => setTimeout(resolve, 300));
          }
        }
      }
    }
  }
  
  showStatusMessage(`Filled ${languages.length} languages successfully.`);

  // Usage example (insert in your main routines and loops):
if (terminate) {
    showStatusMessage("Terminated!!!");
    return;
} // Stops further execution
}



// ✅ FIXED uploadResumeToWorkday() - Using chrome.storage.local
async function uploadResumeToWorkday() {
  // ✅ FIXED: chrome.storage.local (matches options.js)
  const userData = await new Promise(resolve => {
    chrome.storage.local.get('userData', res => resolve(res.userData));
  });

  if (!userData?.resumeFileData || !userData.resumeFileName) {
    showStatusMessage("❌ No resume in storage");
    return;
  }

  showStatusMessage(`📤 Uploading ${userData.resumeFileName}...`);

  // 1. Find Resume section & button
  const resumeSection = await waitForElement('h4[id="Resume/CV-section"]');
  if (!resumeSection) {
    showStatusMessage("❌ Resume section not found");
    return;
  }

  const selectFilesBtn = document.querySelector('button[data-automation-id="select-files"]') ||
                        document.getElementById('resumeAttachments--attachments');
  
  if (!selectFilesBtn) {
    showStatusMessage("❌ Select files button not found");
    return;
  }

  // 2. Create file from base64 data
  const response = await fetch(userData.resumeFileData);
  const resumeBlob = await response.blob();
  const resumeFile = new File([resumeBlob], userData.resumeFileName, {
    type: resumeBlob.type || 'application/pdf'
  });

  // 3. Create FileList (Chrome extension file upload trick)
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(resumeFile);
  const files = dataTransfer.files;

  // 4. Trigger file input (hidden behind button)
  const fileInput = document.querySelector('input[data-automation-id="file-upload-input-ref"]') ||
                   document.querySelector('input[type="file"]') ||
                   selectFilesBtn.parentElement.querySelector('input[type="file"]');
  
  if (fileInput) {
    fileInput.files = files;
    fileInput.dispatchEvent(new Event('change', { bubbles: true }));
    fileInput.dispatchEvent(new Event('input', { bubbles: true }));
    showStatusMessage(`✅ ${userData.resumeFileName} uploaded!`);
    await saveMessageLog(`Resume uploaded: ${userData.resumeFileName}`);
  } else {
    // Fallback: trigger button click then simulate
    selectFilesBtn.click();
    await new Promise(r => setTimeout(r, 500));
    
    const hiddenInput = document.querySelector('input[data-automation-id="file-upload-input-ref"]') ||
                       document.querySelector('input[type="file"]');
    if (hiddenInput) {
      hiddenInput.files = files;
      hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
      hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
      showStatusMessage(`✅ ${userData.resumeFileName} uploaded!`);
    } else {
      showStatusMessage("❌ File input not found");
    }
  }
}




async function selectWorkAuthorization(userValue) {
  if (!userValue) return;

  // All possible label texts to match case-insensitively
  const targetPhrases = [
    "legally authorized to work",
    "authorized to work in the country",
    "authorized to work in the job posting country",
    "authorized to work in the country where this job is located",
    "legally eligible to work in this country",
    "right to work in the country to which you are applying"
  ];

  // Find all fieldsets (container for each question)
  const fieldsets = document.querySelectorAll("fieldset");

  for (const fs of fieldsets) {
    // Get the label text for this question
    const legend = fs.querySelector("legend, .css-f6y8ld, .css-f6y8ld > div");
    if (!legend) continue;
    const labelText = legend.textContent.trim().toLowerCase();

    // Does it match any of our target phrases?
    const found = targetPhrases.some(phrase => labelText.includes(phrase));
    if (!found) continue;

    // Find the dropdown button, typically inside a .css-12zup1l div
    const btn = fs.querySelector("div.css-12zup1l > button, button[aria-haspopup='listbox']");
    if (!btn) continue;

    // Open dropdown
    dispatchMouseClick(btn);
    await new Promise(r => setTimeout(r, 350));

    // Now select the appropriate option
    const options = [...document.querySelectorAll("li[role='option']")];
    const desired = userValue.trim().toLowerCase();

    const match = options.find(opt => opt.textContent.trim().toLowerCase() === desired);
    if (match) {
      dispatchMouseClick(match);
      await new Promise(resolve => setTimeout(resolve, 300));
      showStatusMessage(`Selected work authorization: ${userValue}`);
      return;
    } else {
      showStatusMessage(`Option '${userValue}' not found for authorization field.`);
    }
  }
}

// Autofill relocation question by label phrases and user value
async function selectRelocationQuestion(userValue) {
  if (!userValue) return;

  // Label matching phrases (case-insensitive)
  const targetPhrases = [
    "would you consider relocating",
    "willing to relocate for this role",
    "are you located, or willing to relocate",
    "relocate to this job location"
  ];

  // Relocation dropdown options to try direct text match (case-insensitive)
  const relocationOptions = [
    "i am local to where the job is posted",
    "yes, i would consider relocating for this role",
    "no, i am not able to relocate for this role"
  ];

  const fieldsets = document.querySelectorAll("fieldset");
  for (const fs of fieldsets) {
    const legend = fs.querySelector("legend, .css-f6y8ld, .css-f6y8ld > div");
    if (!legend) continue;
    const labelText = legend.textContent.trim().toLowerCase();

    const found = targetPhrases.some(phrase => labelText.includes(phrase));
    if (!found) continue;

    const btn = fs.querySelector("div.css-12zup1l > button, button[aria-haspopup='listbox']");
    if (!btn) continue;

    dispatchMouseClick(btn);
    await new Promise(r => setTimeout(r, 350));

    // Find all relocation-related options
    const options = Array.from(document.querySelectorAll("li[role='option']"));
    const desired = userValue.trim().toLowerCase();

    // Try matching directly with all relocation option variants
    let match = options.find(opt => relocationOptions
      .some(op => opt.textContent.trim().toLowerCase() === op && desired === op)
    );

    // If not found, fallback according to mapping rules
    if (!match) {
      if (
        desired === "i am local to where the job is posted" ||
        desired === "yes, i would consider relocating for this role"
      ) {
        // Pick option with text "Yes" (case-insensitive)
        match = options.find(opt => opt.textContent.trim().toLowerCase() === "yes");
      } else if (desired === "no, i am not able to relocate for this role") {
        // Pick option with text "No" (case-insensitive)
        match = options.find(opt => opt.textContent.trim().toLowerCase() === "no");
      }
    }

    if (match) {
      dispatchMouseClick(match);
      await new Promise(resolve => setTimeout(resolve, 300));
      showStatusMessage(`Selected relocation option: ${match.textContent.trim()}`);
      return;
    } else {
      showStatusMessage(`Option '${userValue}' not found for relocation question.`);
    }
  }
}


//Visa sponsorship
async function selectVisaSponsorship(userValue) {
  if (!userValue) return;

  // Extended: All possible label texts to match visa sponsorship/authorization variants
  const targetPhrases = [
    "require any immigration filing or visa sponsorship",
    "require sponsorship for employment visa status",
    "require sponsorship for employment to work in the job posting country",
    "require sponsorship to continue to work in this country",
    "visa sponsorship",
    "require sponsorship"
  ];

  // Find all fieldsets (container for each question)
  const fieldsets = document.querySelectorAll("fieldset");

  for (const fs of fieldsets) {
    // Get the label text for this question
    const legend = fs.querySelector("legend, .css-f6y8ld, .css-f6y8ld > div");
    if (!legend) continue;
    const labelText = legend.textContent.trim().toLowerCase();

    // Does it match any of our target phrases?
    const found = targetPhrases.some(phrase => labelText.includes(phrase));
    if (!found) continue;

    // Find the dropdown button, typically inside a .css-12zup1l div
    const btn = fs.querySelector("div.css-12zup1l > button, button[aria-haspopup='listbox']");
    if (!btn) continue;

    // Open dropdown
    dispatchMouseClick(btn);
    await new Promise(r => setTimeout(r, 350));

    // Now select the appropriate option
    const options = [...document.querySelectorAll("li[role='option']")];
    const desired = userValue.trim().toLowerCase();

    // Robust match for both "Yes"/"No"/text/aria-label
    const match = options.find(opt =>
      opt.textContent.trim().toLowerCase() === desired ||
      (opt.getAttribute("aria-label") && opt.getAttribute("aria-label").trim().toLowerCase().includes(desired))
    );

    if (match) {
      dispatchMouseClick(match);
      await new Promise(resolve => setTimeout(resolve, 300));
      // Optionally show a status message
      // showStatusMessage(`Selected visa sponsorship: ${userValue}`);
      return;
    } else {
      showStatusMessage(`Option '${userValue}' not found for visa sponsorship field.`);
    }
  }
}

async function selectGender(userInput) {
  if (!userInput) return;

  const normalizedInput = userInput.trim().toLowerCase();

  // Gender lookup map (each key has an array, including fallback)
  const genderMap = {
    male: ['male', 'man'],
    female: ['female', 'woman'],
    transgender: ['transgender', 'transgender (india)'],
    gay: ['gay'],
    preferNotToDisclose: [
      'prefer not to disclose',
      'undeclared',
      'i decline to self-identify',
      'prefer not to respond',
      'i choose not to self-identify'
    ]
  };

  // Flatten all possible values with corresponding mapping
  let possibleValues = [];
  if (genderMap.male.includes(normalizedInput)) possibleValues = genderMap.male;
  else if (genderMap.female.includes(normalizedInput)) possibleValues = genderMap.female;
  else if (genderMap.transgender.includes(normalizedInput)) possibleValues = genderMap.transgender;
  else if (genderMap.gay.includes(normalizedInput)) possibleValues = genderMap.gay;
  else if (genderMap.preferNotToDisclose.includes(normalizedInput)) possibleValues = genderMap.preferNotToDisclose;
  else possibleValues = [normalizedInput];

  // Find all gender containers (not fieldset)
  const genderContainers = document.querySelectorAll('[data-automation-id="formField-gender"]');
  for (const container of genderContainers) {
    const label = container.querySelector('label, div.css-1ud5i8o, div.css-f6y8ld');
    if (!label) continue;

    const labelText = label.textContent.trim().toLowerCase();
    if (!labelText.includes('gender')) continue;

    const btn = container.querySelector("div.css-12zup1l > button, button[aria-haspopup='listbox']");
    if (!btn) continue;

    dispatchMouseClick(btn);
    await new Promise(r => setTimeout(r, 500));

    const options = Array.from(document.querySelectorAll("li[role='option']"));
    // Try all possible values (in fallback order) for current user input
    let foundOption = null;
    for (const val of possibleValues) {
      foundOption = options.find(opt => opt.textContent.trim().toLowerCase() === val);
      if (foundOption) break;
    }

    if (foundOption) {
      dispatchMouseClick(foundOption);
      await new Promise(resolve => setTimeout(resolve, 300));
      showStatusMessage(`Selected gender option: ${foundOption.textContent.trim()}`);
      return;
    } else {
      showStatusMessage(`No gender option matched for '${userInput}'. Tried fallbacks: ${possibleValues.join(', ')}`);
    }
  }
}



async function selectNonCompeteAgreement(userValue) {
  if (!userValue) return;

  // Match relevant non-compete question text
  const targetPhrases = [
    "non-compete", "non-solicitation", "restrictions at your current or most recent employer",
    "agreement with a current or prior employer", "restrictions on competition or solicitation",
    "non-competition agreement", "non-disclosure agreement"
  ];

  const normalized = userValue.trim().toLowerCase();
  // "Yes" for 'yes' user input, "No" otherwise
  const optionToSelect = normalized === "yes" ? "yes" : "no";

  // Find question containers - fieldset first, fallback to data-automation-id
  let questionContainers = Array.from(document.querySelectorAll("fieldset"));
  if (!questionContainers.length) {
    questionContainers = Array.from(document.querySelectorAll('[data-automation-id^="formField-"]'));
  }

  for (const container of questionContainers) {
    // Detect if this is a non-compete question
    let labelEl = container.querySelector("legend, label, .css-f6y8ld, .css-1ud5i8o");
    if (!labelEl) continue;
    const labelText = labelEl.textContent.trim().toLowerCase();

    if (!targetPhrases.some(phrase => labelText.includes(phrase))) continue;

    // Open dropdown
    const btn = container.querySelector("div.css-12zup1l > button, button[aria-haspopup='listbox']");
    if (!btn) continue;
    dispatchMouseClick(btn);
    await new Promise(r => setTimeout(r, 500));

    // Select "Yes" or "No"
    const options = Array.from(document.querySelectorAll("li[role='option']"));
    const match = options.find(opt => opt.textContent.trim().toLowerCase() === optionToSelect);
    if (match) {
      dispatchMouseClick(match);
      await new Promise(resolve => setTimeout(resolve, 300));
      showStatusMessage(`Selected non-compete agreement: ${match.textContent.trim()}`);
      return;
    } else {
      showStatusMessage(`Option '${userValue}' not found for non-compete field.`);
    }
  }
}


// Typical usage inside main autofill routine
chrome.storage.sync.get("userData", (data) => {
  if (data.userData && data.userData.nonCompeteAgreement) {
    selectNonCompeteAgreement(data.userData.nonCompeteAgreement);
  }
});


async function selectExportControlCitizenship(userValue) {
  if (!userValue) return;

  const targetPhrases = [
    "are you a current citizen, national or resident of any of the following countries/regions",
    "please indicate if you are a citizen or permanent resident of one or more of the countries listed below",
    "us export control",
    "iran", "cuba", "north korea", "syria", "crimea", "donetsk",
    "luhansk", "armenia", "azerbaijan", "belarus", "cambodia",
    "china", "georgia", "hong kong", "iraq", "kazakhstan", "kyrgyzstan",
    "laos", "libya", "macao", "moldova", "mongolia", "myanmar",
    "nicaragua", "north sudan", "russia", "tajikistan", "turkmenistan",
    "ukraine", "uzbekistan", "venezuela", "vietnam", "yemen"
  ];

  const normalizedValue = userValue.trim().toLowerCase();
  const desiredOption = normalizedValue === 'yes' ? 'yes' : 'no';

  // Query all fieldsets or fallback to formField containers
  let questionContainers = Array.from(document.querySelectorAll('fieldset'));
  if (!questionContainers.length) {
    questionContainers = Array.from(document.querySelectorAll('[data-automation-id^="formField-"]'));
  }

  for (const container of questionContainers) {
    let labelEl = container.querySelector('legend, label, .css-f6y8ld, .css-g0k1s4');
    if (!labelEl) continue;

    const labelText = labelEl.textContent.toLowerCase();
    if (!targetPhrases.some(phrase => labelText.includes(phrase))) continue;

    const btn = container.querySelector('div.css-12zup1l > button, button[aria-haspopup="listbox"]');
    if (!btn) continue;

    dispatchMouseClick(btn);
    await new Promise(resolve => setTimeout(resolve, 500));

    const options = Array.from(document.querySelectorAll('li[role="option"]'));
    const match = options.find(opt => opt.textContent.trim().toLowerCase() === desiredOption);

    if (match) {
      dispatchMouseClick(match);
      await new Promise(resolve => setTimeout(resolve, 300));
      showStatusMessage(`Selected citizenship option: ${match.textContent.trim()}`);
      return;
    }
  }

  showStatusMessage(`No matching option found for citizenship input: ${userValue}`);
}



chrome.storage.sync.get('userData', (data) => {
  if (data.userData && data.userData.exportControlCitizenship) {
    selectExportControlCitizenship(data.userData.exportControlCitizenship);
  }
});



async function selectGovEmploymentQuestion(userValue) {
  if (!userValue) return;

  // Extended target phrases to cover all question variants
  const targetPhrases = [
    "employed by the u.s. federal government",
    "u.s. military officer",
    "u.s. military civilian equivalent",
    "employed by the u.s. government",
    "publicly funded institutions",
    "civilian or military capacity",
    "conflict of interest",
    "government or public body",
    "employed by the federal or any state or local government",
    "public institution within",
    "employee of non-U.S. government",
    "government employee of the executive branch (president’s office)"
  ];

  const normalized = userValue.trim().toLowerCase();
  const desiredOption = normalized === "yes" ? "yes" : "no";

  let questionContainers = Array.from(document.querySelectorAll("fieldset"));
  if (!questionContainers.length) {
    questionContainers = Array.from(document.querySelectorAll('[data-automation-id^="formField-"]'));
  }

  for (const container of questionContainers) {
    let labelEl = container.querySelector("legend, label, .css-f6y8ld, .css-g0k1s4");
    if (!labelEl) continue;
    const labelText = labelEl.textContent.toLowerCase();

    if (!targetPhrases.some(phrase => labelText.includes(phrase))) continue;

    const btn = container.querySelector("div.css-12zup1l > button, button[aria-haspopup='listbox']");
    if (!btn) continue;
    dispatchMouseClick(btn);
    await new Promise(r => setTimeout(r, 350));

    const options = Array.from(document.querySelectorAll("li[role='option']"));
    const match = options.find(opt => opt.textContent.trim().toLowerCase() === desiredOption);

    if (match) {
      dispatchMouseClick(match);
      await new Promise(resolve => setTimeout(resolve, 300));
      showStatusMessage(`Selected gov-related employment option: ${match.textContent.trim()}`);
      return;
    }
  }
  showStatusMessage(`No matching option found for gov-related employment: ${userValue}`);
}


async function selectUSGovEmploymentQuestion(userValue) {
  if (!userValue) return;

  const normalized = userValue.trim().toLowerCase();
  const desiredOption = normalized === 'yes' ? 'yes' : 'no';

  const targetPhrases = [
    'are you a current or former employee of the united states government',
    'current or former employee of the united states government'
  ];

  let containers = Array.from(document.querySelectorAll('fieldset'));
  if (!containers.length) {
    containers = Array.from(
      document.querySelectorAll('[data-automation-id^="formField-"]')
    );
  }

  for (const container of containers) {
    const labelEl = container.querySelector(
      'legend, label, .css-f6y8ld, .css-g0k1s4'
    );
    if (!labelEl) continue;

    const labelText = labelEl.textContent.trim().toLowerCase();
    const matches = targetPhrases.some(phrase =>
      labelText.includes(phrase)
    );
    if (!matches) continue;

    const btn = container.querySelector(
      "div.css-12zup1l > button, button[aria-haspopup='listbox']"
    );
    if (!btn) continue;

    dispatchMouseClick(btn);
    await delay(350);

    // 1. Prefer the listbox inside/near this container
    let listbox =
      container.querySelector('ul[role="listbox"]') ||
      btn.closest('div')?.querySelector('ul[role="listbox"]');

    // 2. Fallback: nearest listbox by vertical distance to the button
    if (!listbox) {
      const all = Array.from(document.querySelectorAll('ul[role="listbox"]'));
      if (!all.length) continue;
      const btnRect = btn.getBoundingClientRect();
      listbox = all.sort((a, b) => {
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();
        return (
          Math.abs(aRect.top - btnRect.top) -
          Math.abs(bRect.top - btnRect.top)
        );
      })[0];
    }

    if (!listbox) continue;

    const options = Array.from(listbox.querySelectorAll('li[role="option"]'));
    const match = options.find(opt =>
      opt.textContent.trim().toLowerCase() === desiredOption
    );

    if (match) {
      dispatchMouseClick(match);
      await delay(300);
      showStatusMessage(
        `Selected US gov employment option: ${match.textContent.trim()}`
      );
      return;
    }
  }

  showStatusMessage(
    `No matching option found for US gov employment question: ${userValue}`
  );
}





chrome.storage.sync.get('userData', (data) => {
  if (data.userData && data.userData.govEmploymentQuestion) {
    selectGovEmploymentQuestion(data.userData.govEmploymentQuestion);
  }
});




// Helper to delay execution for given milliseconds
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function autofillYesNoQuestionsSequentially(questions) {
  for (const { userValue, targetPhrases } of questions) {
    await autofillSingleYesNoQuestion(userValue, targetPhrases);
    // Wait a bit after each to ensure UI settles
    await delay(500);
  }
}

async function autofillSingleYesNoQuestion(userValue, targetPhrases) {
  if (!userValue) return;

  const desired = userValue.trim().toLowerCase();
  const optionToClick = desired === 'yes' ? 'yes' : 'no';

  // Find all possible question containers (try fieldsets or fallback)
  let containers = Array.from(document.querySelectorAll('fieldset'));
  if (!containers.length) {
    containers = Array.from(document.querySelectorAll('[data-automation-id^="formField-"]'));
  }

  for (const container of containers) {
    const labelEl = container.querySelector('legend, label, .css-f6y8ld, .css-g0k1s4');
    if (!labelEl) continue;
    const labelText = labelEl.textContent.toLowerCase();

    if (!targetPhrases.some(phrase => labelText.includes(phrase))) continue;

    const btn = container.querySelector("div.css-12zup1l > button, button[aria-haspopup='listbox']");
    if (!btn) continue;

    dispatchMouseClick(btn);
    await delay(350);

    const options = Array.from(document.querySelectorAll("li[role='option']"));
    const match = options.find(opt => opt.textContent.trim().toLowerCase() === optionToClick);

    if (match) {
      dispatchMouseClick(match);
      await delay(350);
      return; // stop searching once found and selected
    }
  }
}


(async () => {
  showStatusMessage("Starting autofill...");
  await saveMessageLog("Starting autofill...");

  const userData = await new Promise((resolve) => {
    chrome.storage.sync.get(["userData"], (res) => resolve(res.userData || {}));
  });

  if (!userData) {
    showStatusMessage("No user data found. Please fill data in options.");
    await saveMessageLog("No user data found.");
    return;
  }

  // Autofill Email
  await fillField(document.querySelector('input[data-automation-id="email"]'), userData.email);
  // Autofill Password
  await fillField(document.querySelector('input[data-automation-id="password"]'), userData.password);
  // Autofill Verify New Password with same value
  await fillField(document.querySelector('input[data-automation-id="verifyPassword"]'), userData.password);

  await checkAgreementCheckbox(userData.agreedToTerms);
  //terminate = true;

   // Usage example (insert in your main routines and loops):
   //let terminate = false;
  if (terminate) {
    showStatusMessage("Page filled!!!");
    return;
  } // Stops further execution

  await selectSearchableDropdown(userData.hearAboutSource);
  await selectHearAboutSource(userData.hearAboutSource)
  await fillField(document.querySelector("#name--legalName--firstName"), userData.firstName);
  await fillField(document.querySelector("#name--legalName--middleName"), userData.middleName);
  await fillField(document.querySelector("#name--legalName--middleNameLocal"), userData.middleNameLocal);
  await fillField(document.querySelector("#name--legalName--lastName"), userData.lastName);
  await fillField(document.querySelector("#name--legalName--lastNameLocal"), userData.lastNameLocal);
  await fillField(document.querySelector("#phoneNumber--phoneNumber"), userData.phone);
  await setPhoneTypeWithDelay((userData.phoneType || "mobile").toLowerCase());

  await fillField(document.querySelector('input[id="emailAddress--emailAddress"]'), userData.email);

  await fillField(document.querySelector("#address--addressLine1"), userData.addressLine1);
  await fillField(document.querySelector("#address--city"), userData.city);
  await fillField(document.querySelector("#address--postalCode"), userData.postalCode);
  await fillStateIndia(userData); 
  const radioValue = (userData.workedForWorkday || "").toLowerCase() === "yes" ? "true" : "false";
  await selectPreviousWorkerRadio(radioValue);


   // Usage example (insert in your main routines and loops):
if (terminate) {
    showStatusMessage("Terminated!!!");
    return;
} // Stops further execution

 // Extract all work experience entries with all fields
const workExps = [
  {
    jobTitle: userData.jobTitle1,
    companyName: userData.company1,
    location: userData.location1,
    current: userData.current1,
    from: userData.from1,
    to: userData.to1,
    desc: userData.desc1
  },
  {
    jobTitle: userData.jobTitle2,
    companyName: userData.company2,
    location: userData.location2,
    current: userData.current2,
    from: userData.from2,
    to: userData.to2,
    desc: userData.desc2
  },
  {
    jobTitle: userData.jobTitle3,
    companyName: userData.company3,
    location: userData.location3,
    current: userData.current3,
    from: userData.from3,
    to: userData.to3,
    desc: userData.desc3
  }
].filter(exp => 
  exp.jobTitle || 
  exp.companyName || 
  exp.location || 
  exp.current ||
  exp.from || 
  exp.to || 
  exp.desc
); // Keep if ANY field is filled

  
  const timesToAdd = Math.max(0, workExps.length); 
  await clickAddWorkExperience(timesToAdd);

  await fillWorkExperiences(userData);

  await fillEducationSection(userData);

  //await fillSkillsSection(userData.skills || []); 

   await fillLanguagesSection(userData);

   await uploadResumeToWorkday();

  // Usage example (insert in your main routines and loops):
  if (terminate) {
    showStatusMessage("Terminated!!!");
    return;
  } // Stops further execution

  const skills = userData.skills 
  ? userData.skills.map(skill => skill.trim())
      .filter(skill => skill.length > 0)
  : [];

  // Call the function
  await fillSkillsSection(skills);


  const userWebsites = [userData.website1, userData.website2, userData.website3].filter(Boolean);
  await fillWebsiteURLsDynamic(userWebsites);

  await fillSocialNetworkUrls(userData);

  await selectWorkAuthorization(userData.legalAuthorization); // where legalAuthorization = "Yes" or "No"

  await selectRelocationQuestion(userData.relocationPreference);

  await selectVisaSponsorship(userData.relocationPreference);

  await selectGender(userData.gender);

  await selectNonCompeteAgreement(userData.nonCompeteAgreement);

  await selectExportControlCitizenship(userData.exportControlCitizenship);

  await selectUSGovEmploymentQuestion(userData.USGovEmploymentQuestion);

  await selectGovEmploymentQuestion(userData.govEmploymentQuestion);

  


  const questionsToFill = [
  {
    userValue: userData.legalAuthorization,
    targetPhrases: [
    "legally authorized to work",
    "authorized to work in the country",
    "authorized to work in the job posting country",
    "authorized to work in the country where this job is located",
    "legally eligible to work in this country",
    "right to work in the country to which you are applying"
  ]
  },
  {
    userValue: userData.relocationPreference,
    targetPhrases: [
    "require any immigration filing or visa sponsorship",
    "require sponsorship for employment visa status",
    "require sponsorship for employment to work in the job posting country",
    "require sponsorship to continue to work in this country",
    "visa sponsorship",
    "require sponsorship"
  ]
  },
  {
    userValue: 'No',
    targetPhrases: [
    "non-compete", "non-solicitation", "restrictions at your current or most recent employer",
    "agreement with a current or prior employer", "restrictions on competition or solicitation",
    "non-competition agreement", "non-disclosure agreement"
  ]
  },
  // Add further questions here
];



  // Prompt user to upload resume file manually at the end
  //await promptResumeFileUpload();

  // Usage example (insert in your main routines and loops):
  if (terminate) {
    showStatusMessage("Terminated!!!");
    return;
  } // Stops further execution

  showStatusMessage("Autofill complete!");
  await saveMessageLog("Autofill complete!");

})();

})();