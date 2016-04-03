var attributes = {};

chrome.storage.sync.get(null, function(items) {
  attributes = items;

  var path = location.pathname,
  keyPrefix = "YOUSE__",
  delay = getValue('delay');

  if (!delay) {
    alert('Clique com o botão direito no ícone do plugin e salve os dados iniciais antes de prosseguir');
    return;
  }

  function fill_in(name, value) {
    var element = $('[name="' + name + '"]')
    element.val(value);
    element[0].dispatchEvent(new KeyboardEvent("keyup"));
  }

  function select(name, value) {
    var element = $('[name="' + name + '"]').val(value);
    element[0].dispatchEvent(new KeyboardEvent("change"))
  }

  function getValue(key) {
    return attributes[keyPrefix + key];
  }

  if (path === "/auto/quotes/new") {
    fill_in('auto_quote[lead_person_attributes][name]', getValue('leadName'));
    fill_in('auto_quote[lead_person_attributes][phone]', getValue('leadPhone'));
    fill_in('auto_quote[lead_person_attributes][email]', getValue('leadEmail'));
  }

  if (path === "/auto/quotes/vehicles/edit") {
    select('auto_quote[vehicle][make]', getValue('vehicleMake'));
    setTimeout(function(){
      select('auto_quote[vehicle][model]', getValue('vehicleModel'));
      setTimeout(function(){
        select('auto_quote[vehicle][year]', getValue('vehicleYear'));
        setTimeout(function(){
          select('auto_quote[vehicle][version]', getValue('vehicleVersion'));
          select('auto_quote[vehicle][brand_new]', getValue('vehicleBrandNew'));
          select('auto_quote[vehicle][usage]', getValue('vehicleUsage'));
          select('auto_quote[vehicle][purchased]', getValue('vehiclePurchased'));
          select('auto_quote[vehicle][collected]', getValue('vehicleCollected'));
          fill_in('auto_quote[vehicle_address][cep]', getValue('vehicleCep'));
          select('auto_quote[vehicle][collected]', getValue('vehicleCollected'));
          select('auto_quote[driver][gender]', getValue('driverGender'));
          fill_in('auto_quote[driver][date_of_birth]', getValue('driverDateOfBirth'));

          $.each($('[data-narrative-form-triggered-by="driver_date_of_birth"]'), function() {
            $(this).addClass('narrative-form__field--revealed');
          });

          select('auto_quote[driver][years_since_last_claim]', getValue('driverLastClaim'));
        }, delay);
      }, delay);
    }, delay);
  }

  if (path === '/auto/proposals/insured_people/edit') {
    fill_in('auto_quote[insured_person][name]', getValue('insuredPersonName'));
    fill_in('auto_quote[insured_person][cpf]', getValue('insuredPersonCpf'));
    select('auto_quote[insured_person][job_role]', getValue('insuredPersonJobRole'));
    select('auto_quote[insured_person][salary_range]', getValue('insuredPersonSalaryRange'));
    fill_in('auto_quote[insured_person_address][number]', getValue('insuredPersonAddressNumber'));
  }

  if (path === '/auto/proposals/vehicles/edit') {
    fill_in('auto_quote[vehicle][license_plate]', getValue('vehicleLicensePlate'));
    select('auto_quote[vehicle][bullet_proof]', getValue('vehicleBulletProof'));
  }

  if (path === '/auto/payments/new' || path === '/home/proposals/payments/new') {
    fill_in('credit_card_payment[credit_card][number]', getValue('4111 1111 1111 1111'));
    fill_in('credit_card_payment[credit_card][name]', getValue('John Doe'));
    select('credit_card_payment[credit_card][due_date_month]', getValue('5'));
    select('credit_card_payment[credit_card][due_date_year]', getValue('2018'));
    fill_in('credit_card_payment[credit_card][cvv_number]', getValue('123'));
    $('[name="credit_card_payment[terms_of_service]"]').prop('checked', true);
  }

  if (path === '/home/quotes/new') {
    fill_in('home_quote[lead_person_attributes][name]', getValue('leadName'));
    alert('olá2');
    fill_in('home_quote[lead_person_attributes][phone]', getValue('leadPhone'));
    fill_in('home_quote[lead_person_attributes][email]', getValue('leadEmail'));

    select('home_quote[property_type_usage]', getValue('propertyTypeUsage'));
    fill_in('home_quote[property_price]', getValue('propertyValue'));
    fill_in('home_quote[property_cep]', getValue('propertyCep'));
  }

  if (path === '/home/proposals/insured_people/edit') {
    select('home_proposal[insured_person][gender]', getValue('insuredPersonGender'));
    fill_in('home_proposal[insured_person][cpf]', getValue('insuredPersonCpf'));
    fill_in('home_proposal[insured_person][date_of_birth]', getValue('insuredPersonDateOfBirth'));
    select('home_proposal[insured_person][job_role]', getValue('insuredPersonJobRole'));
    select('home_proposal[insured_person][salary_range]', getValue('insuredPersonSalaryRange'));
  }

  if (path === '/home/proposals/properties/edit') {
    fill_in('home_proposal[property_address][number]', getValue('insuredPersonAddressNumber'));
  }

  if (path === '/life/quotes/new') {
    fill_in('life_quote[lead_person_attributes][name]', getValue('leadName'));
    fill_in('life_quote[lead_person_attributes][phone]', getValue('leadPhone'));
    fill_in('life_quote[lead_person_attributes][email]', getValue('leadEmail'));
    fill_in('life_quote[insured_person][date_of_birth]', getValue('insuredPersonDateOfBirth'));
    select('life_quote[insured_person][job_role]', getValue('insuredPersonJobRole'));
    select('life_quote[insured_person][salary_range]', getValue('insuredPersonSalaryRange'));
  }
});
