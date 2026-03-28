document.addEventListener('DOMContentLoaded', () => {

  const passwordInput = document.getElementById('password');
  const verifyPasswordInput = document.getElementById('verifyPassword');
  const agreementCheckbox = document.querySelector('input[data-automation-id="createAccountCheckbox"]');
  const legalAuthorizationSelect = document.getElementById("legalAuthorization");
  const relocationSelect = document.getElementById("relocationPreference");
  const visaSponsorshipSelect = document.getElementById("visaSponsorship");
  const genderSelect = document.getElementById('gender');
  const nonCompeteAgreementSelect = document.getElementById("nonCompeteAgreement");
  const exportControlCitizenshipSelect = document.getElementById('exportControlCitizenship');
  const govEmploymentQuestionSelect = document.getElementById('govEmploymentQuestion');
  const usGovEmploymentQuestionSelect = document.getElementById('USGovEmploymentQuestion');


  chrome.storage.sync.get('userData', (data) => {
    if (data.userData) {
        const password = data.userData.password || '';
        document.getElementById('email').value = data.userData.email || '';
        passwordInput.value = password;
        verifyPasswordInput.value = password; // Sync on load
      }

    // Mirror password to verifyPassword on every keystroke
  passwordInput.addEventListener('input', (e) => {
    verifyPasswordInput.value = e.target.value;
  });

  const isChecked = !!(data.userData && data.userData.agreedToTerms);
  if (agreementCheckbox) {
    agreementCheckbox.checked = isChecked;
    agreementCheckbox.dispatchEvent(new Event('input', { bubbles: true }));
    agreementCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
  }


      const keys = [
        'firstName', 'middleName', 'middleNameLocal', 'lastName', 'lastNameLocal',
        'phone', 'phoneType', 'addressLine1', 'city', 'postalCode', 'stateIndia'
      ];

      keys.forEach(key => {
        const el = document.getElementById(key);
        if (el && data.userData[key]) {
          el.value = data.userData[key];
        }
      });


      //Load "How did you hear about this job?" (new field)
    const hearAboutSelect = document.getElementById('hearAboutSource');
    if (data.userData && data.userData.hearAboutSource && hearAboutSelect) {
      hearAboutSelect.value = data.userData.hearAboutSource;
    }
      

      const skillsInput = document.getElementById('skillsInput');
if (skillsInput && Array.isArray(data.userData?.skills)) {
  skillsInput.value = data.userData.skills.join(', ');
}


      const worked = data.userData.workedForWorkday || '';
      if (worked) {
        const radio = document.querySelector(`input[name="workedForWorkday"][value="${worked}"]`);
        if (radio) radio.checked = true;
      }

      // Load websites URLs
      ['website1', 'website2', 'website3'].forEach(id => {
        const el = document.getElementById(id);
        if (el && data.userData[id]) {
          el.value = data.userData[id];
        }
      });

      const updateCheckboxUI = (checkbox, checked) => {
        if (!checkbox) return;
        setTimeout(() => {
          checkbox.checked = checked;
          checkbox.dispatchEvent(new Event('input', { bubbles: true }));
          checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        }, 300);
      };

      // Load social network URLs
      const socialFields = ['linkedInUrl', 'twitterUrl'];
      socialFields.forEach(id => {
      const el = document.getElementById(id);
     if (el && data.userData[id]) {
        el.value = data.userData[id];
    }
});


      for (let i = 1; i <= 3; i++) {
        ['jobTitle', 'company', 'location', 'from', 'to', 'desc'].forEach(field => {
          const el = document.getElementById(field + i);
          if (el) el.value = data.userData[field + i] || '';
        });

        let val = data.userData['current' + i];
        if (typeof val === 'string') {
          val = val.toLowerCase() === 'true';
        }
        updateCheckboxUI(document.getElementById('current' + i), !!val);
      }

      // Load saved education data
for (let i = 1; i <= 3; i++) {
  ["schoolName", "degree", "gpa", "fromEdu", "toEdu"].forEach(field => {
    const el = document.getElementById(field + i);
    if (el && data.userData[field + i]) el.value = data.userData[field + i];
  });
}



      // Load language data
      const languageFields = [
            'languagesInput', 'nativeLanguagesInput', 'comprehensionProficiency',
            'overallProficiency', 'readingProficiency', 'speakingProficiency', 'writingProficiency'
      ];

             
      languageFields.forEach(field => {
            const el = document.getElementById(field);
            if (el && data.userData[field]) {
                el.value = data.userData[field];
            }
            
        });

    
  // Add after other fields loading:
// ✅ FIXED Resume upload - Using chrome.storage.local (NO quota error)
const resumeFileInput = document.getElementById('resumeFile');
if (resumeFileInput?.files[0]) {
  const file = resumeFileInput.files[0];
  
  // Check file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    alert('Resume too large! Max 5MB');
    return;
  }

  showStatusMessage('📄 Saving resume...');
  
  // Convert to base64
  const reader = new FileReader();
  reader.onload = async (e) => {
    userData.resumeFileName = file.name;
    userData.resumeFileData = e.target.result; // base64
    
    // ✅ FIXED: chrome.storage.local (unlimited quota)
    await chrome.storage.local.set({ userData });
    document.getElementById('status').textContent = `✅ ${file.name} saved!`;
  };
  reader.readAsDataURL(file);
  
  setTimeout(() => document.getElementById('status').textContent = '', 3000);
  return; // Wait for async save
}

// Save other fields if no resume
chrome.storage.local.set({data}, () => {
  document.getElementById('status').textContent = '✅ Settings saved!';
  setTimeout(() => document.getElementById('status').textContent = '', 2000);
});




        if (data.userData && data.userData.legalAuthorization) {
          legalAuthorizationSelect.value = data.userData.legalAuthorization;
        }

       if (data.userData && data.userData.relocationPreference) {
        relocationSelect.value = data.userData.relocationPreference;
       }

       if (data.userData && data.userData.visaSponsorship) {
        visaSponsorshipSelect.value = data.userData.visaSponsorship;
       }

       if (data.userData && data.userData.gender) {
        genderSelect.value = data.userData.gender;
      }

      if (data.userData && data.userData.nonCompeteAgreement) {
        nonCompeteAgreementSelect.value = data.userData.nonCompeteAgreement;
      }

       if (data.userData.exportControlCitizenship && data.userData.exportControlCitizenshipSelect) {
        exportControlCitizenshipSelect.value = data.userData.exportControlCitizenship;
      }

      if (data.userData && data.userData.govEmploymentQuestion) {
      govEmploymentQuestionSelect.value = data.userData.govEmploymentQuestion;
      }

      if (data.userData && data.userData.USGovEmploymentQuestion) {
        usGovEmploymentQuestionSelect.value = data.userData.USGovEmploymentQuestion;
      }

    }
  );



  const form = document.getElementById('userForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userData = {};

    userData["email"] = document.getElementById('email').value;
    userData["password"] =  document.getElementById('password').value;
    userData["agreedToTerms"] = agreementCheckbox ? agreementCheckbox.checked : false;

    const keys = [
        'firstName', 'middleName', 'middleNameLocal', 'lastName', 'lastNameLocal',
        'phone', 'phoneType', 'addressLine1', 'city', 'postalCode', 'stateIndia'
      ];
    keys.forEach(key => {
      const el = document.getElementById(key);
      userData[key] = el ? el.value : '';
      console.log(`${el}:${el.value}`);
    });

    // Save "How did you hear about this job?" (new field)
    const hearAboutSelect = document.getElementById('hearAboutSource');
    if (hearAboutSelect) {
      userData.hearAboutSource = hearAboutSelect.value;
    }

    const workedRadio = document.querySelector('input[name="workedForWorkday"]:checked');
    userData.workedForWorkday = workedRadio ? workedRadio.value : '';

    // Save websites URLs
    ['website1', 'website2', 'website3'].forEach(id => {
      const el = document.getElementById(id);
      userData[id] = el ? el.value : '';
    });

    for (let i = 1; i <= 3; i++) {
      userData['jobTitle' + i] = document.getElementById('jobTitle' + i).value;
      userData['company' + i] = document.getElementById('company' + i).value;
      userData['location' + i] = document.getElementById('location' + i).value;
      userData['current' + i] = !!document.getElementById('current' + i).checked;
      userData['from' + i] = document.getElementById('from' + i).value;
      userData['to' + i] = document.getElementById('to' + i).value;
      userData['desc' + i] = document.getElementById('desc' + i).value;
    }


    // Save education data
for (let i = 1; i <= 3; i++) {
  userData["schoolName" + i] = document.getElementById("schoolName" + i).value;
  userData["degree" + i] = document.getElementById("degree" + i).value;
  userData["gpa" + i] = document.getElementById("gpa" + i).value; 
  userData["fromEdu" + i] = document.getElementById("fromEdu" + i).value;
  userData["toEdu" + i] = document.getElementById("toEdu" + i).value;
}

// Combine structured education objects
userData.education = [];
for (let i = 1; i <= 3; i++) {
  userData.education.push({
    schoolName: userData["schoolName" + i],
    degree: userData["degree" + i],
    gpa: userData["gpa" + i],
    from: userData["fromEdu" + i],
    to: userData["toEdu" + i],
  });
}

    // Save social network URLs
    const socialFields = ['linkedInUrl', 'twitterUrl'];
    socialFields.forEach(id => {
    const el = document.getElementById(id);
    userData[id] = el ? el.value : '';
    });


    const skillsInput = document.getElementById('skillsInput');
    let skillsArr = [];
    if (skillsInput && skillsInput.value.trim()) {
      skillsArr = skillsInput.value.split(',').map(s => s.trim()).filter(Boolean);
    }
    userData.skills = skillsArr;
    console.log(skillsArr);
    console.log(userData.skills);


    // Save language data
    const languageFields = [
      'languagesInput', 'nativeLanguagesInput', 'comprehensionProficiency',
      'overallProficiency', 'readingProficiency', 'speakingProficiency', 'writingProficiency'
    ];

    languageFields.forEach(field => {
      const el = document.getElementById(field);
      if (el) {
        userData[field] = el.value;
      }
    });

    // Add inside form.addEventListener('submit', ...):


// ✅ Correct for options.html (popup)
function showStatus(msg) {
  const statusEl = document.getElementById('status');
  if (statusEl) statusEl.textContent = msg;
  console.log('Status:', msg);
}

const resumeFileInput = document.getElementById('resumeFile');
if (resumeFileInput.files.length > 0) {
  const file = resumeFileInput.files[0];
  const reader = new FileReader();
  
  reader.onload = async (e) => {
  userData.resumeFileName = file.name;
  userData.resumeFileData = e.target.result;
  
  await chrome.storage.local.set({ userData });
  
  // ✅ FIXED - showStatus for options.html
  const statusEl = document.getElementById('status');
  if (statusEl) statusEl.textContent = `✅ ${file.name} saved!`;
  else console.log(`✅ ${file.name} saved!`);
};

  
  reader.readAsDataURL(file); // Convert to base64
} else {
  // Keep existing filename reference
  userData.resumeFileName = data.userData?.resumeFileName || '';
}


    userData.legalAuthorization = document.getElementById("legalAuthorization").value;
    userData.relocationPreference = document.getElementById("relocationPreference").value;
    userData.visaSponsorship = document.getElementById("visaSponsorship").value;
    userData.gender = document.getElementById("gender").value;
    userData.nonCompeteAgreement = document.getElementById("nonCompeteAgreement").value;
    userData.exportControlCitizenship = exportControlCitizenshipSelect ? exportControlCitizenshipSelect.value : '';
    userData.govEmploymentQuestion = govEmploymentQuestionSelect ? govEmploymentQuestionSelect.value : '';
    userData.USGovEmploymentQuestion = usGovEmploymentQuestionSelect ? usGovEmploymentQuestionSelect.value : '';



    chrome.storage.sync.set({ userData }, () => {
      const status = document.getElementById('status');
      status.textContent = 'Saved!';
      setTimeout(() => (status.textContent = ''), 2000);
    });
    
  });
});
