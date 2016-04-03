var attributes = {
  delay: 800,
  leadName: 'John Doe',
  leadPhone: '(11) 11111-1111',
  leadEmail: 'fakemail@gmail.com',

  insuredPersonName: 'John Doe',
  insuredPersonCpf: '427.848.588-39',
  insuredPersonJobRole: '999201',
  insuredPersonSalaryRange: 'Band4',
  insuredPersonAddressNumber: '500',
  insuredPersonGender: 'M',
  insuredPersonDateOfBirth: '01/01/1990',

  // AUTO
  make: 'CHEVROLET',
  model: 'CELTA',
  version: 'CELTA SPIRIT / LT 1.0 MPFI 8V FLEXP. 5P (Flex)',
  year: '2015',

  vehicleBrandNew: 'zero_km_with_license_plate',
  vehicleUsage: 'auto|private',
  vehiclePurchased: "true",
  vehicleCollected: "true",
  vehicleCep: '08461-660',
  vehicleLicensePlate: 'EMP5324',
  vehicleBulletProof: 'false',

  driverGender: 'M',
  driverDateOfBirth: '01/01/1990',
  driverLastClaim: 5,

  // HOME
  propertyTypeUsage: 'house|habitual',
  propertyValue: '500.000',
  propertyCep: '08461-660'
}

// Saves options to chrome.storage
function save_options() {
  for (var key in attributes) {
    localStorage[key] = document.getElementById(key).value;
  }

  alert('Dados salvos com sucesso');
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  for (var key in attributes) {
    document.getElementById(key).value = localStorage[key] || attributes[key];
  }
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
