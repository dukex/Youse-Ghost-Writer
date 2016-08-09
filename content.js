var attributes = {};

chrome.storage.sync.get(null, function(items) {
  attributes = items;

  var path = location.pathname,
  keyPrefix = "YOUSE__",
  delay = getValue('delay');

  if (!delay) {
    alert('Clique com o botão direito no ícone do plugin, vá em options e salve os dados iniciais antes de prosseguir');
    return;
  }

  function fill_in(name, value) {
    var elements = $('[name="' + name + '"]');
    $.each(elements, function() {
      $(this).val(value);
      $(this)[0].dispatchEvent(new KeyboardEvent("input"));
      $(this)[0].dispatchEvent(new KeyboardEvent("keyup"));
    });

    return elements;
  }

  function select(name, value) {
    var elements = $('[name="' + name + '"]');
    $.each(elements, function() {
      $(this).val(value);
      $(this)[0].dispatchEvent(new KeyboardEvent("change"));
      $(this)[0].dispatchEvent(new KeyboardEvent("input"));
    });

    return elements;
  }

  function setJobRole(name, jobName) {
    var value = $('[name="' + name + '"] option:contains(' + jobName + ')').val();
    var elements = select(name, value);
    elements.trigger('change.select2');
    return elements;
  }

  function getValue(key) {
    return attributes[keyPrefix + key];
  }

  function trigger(triggerName) {
    $.each($('[data-narrative-form-triggered-by="' + triggerName + '"]'), function() {
      $(this).addClass('narrative-form__field--revealed');
    });
  }

  if (path === '/auto/order/edit' || path === '/auto/order/lead_person_data') {
    fill_in('auto_order_flow_lead_person_data[lead_person_attributes][name]', getValue('leadName'));
    fill_in('auto_order_flow_lead_person_data[lead_person_attributes][phone]', getValue('leadPhone'));
    fill_in('auto_order_flow_lead_person_data[lead_person_attributes][email]', getValue('leadEmail'));
  }

  if (path === '/auto/order/pricing_requirements/edit' || path === '/auto/order/pricing_requirements') {
    select('auto_order_flow_pricing_requirements[vehicle_attributes][make]', getValue('vehicleMake'));
    setTimeout(function(){
      select('auto_order_flow_pricing_requirements[vehicle_attributes][model]', getValue('vehicleModel'));
      setTimeout(function(){
        select('auto_order_flow_pricing_requirements[vehicle_attributes][year]', getValue('vehicleYear'));
        setTimeout(function(){
          select('auto_order_flow_pricing_requirements[vehicle_attributes][version]', getValue('vehicleVersion'));
          select('auto_order_flow_pricing_requirements[vehicle_attributes][brand_new]', getValue('vehicleBrandNew'));
          select('auto_order_flow_pricing_requirements[vehicle_attributes][usage]', getValue('vehicleUsage'));
          select('auto_order_flow_pricing_requirements[vehicle_attributes][purchased]', getValue('vehiclePurchased'));
          select('auto_order_flow_pricing_requirements[vehicle_attributes][collected]', getValue('vehicleCollected'));
          fill_in('auto_order_flow_pricing_requirements[vehicle_attributes][address_attributes][zipcode]', getValue('vehicleCep'));
          select('auto_order_flow_pricing_requirements[vehicle_attributes][collected]', getValue('vehicleCollected'));
          select('auto_order_flow_pricing_requirements[driver_attributes][gender]', getValue('driverGender'));
          fill_in('auto_order_flow_pricing_requirements[driver_attributes][date_of_birth]', getValue('driverDateOfBirth'));
          trigger('driver_date_of_birth');
          select('auto_order_flow_pricing_requirements[driver_attributes][years_since_last_claim]', getValue('driverLastClaim'));
        }, delay);
      }, delay);
    }, delay);
  }

  if (path === '/auto/order/insured_person_data/edit' || path === '/auto/order/insured_person_data') {
    fill_in('auto_order_flow_insured_person_data[insured_person_attributes][name]', getValue('insuredPersonName'));
    fill_in('auto_order_flow_insured_person_data[insured_person_attributes][cpf]', getValue('insuredPersonCpf'));
    setJobRole('auto_order_flow_insured_person_data[insured_person_attributes][occupation]', getValue('insuredPersonJobRole'));
    select('auto_order_flow_insured_person_data[insured_person_attributes][salary_range]', getValue('insuredPersonSalaryRange'));
    fill_in('auto_order_flow_insured_person_data[insured_person_attributes][address_attributes][number]', getValue('insuredPersonAddressNumber'));
  }

  if (path === '/auto/order/vehicle_data/edit' || path === '/auto/order/vehicle_data') {
    fill_in('auto_order_flow_vehicle_data[vehicle_attributes][license_plate]', getValue('vehicleLicensePlate'));
    select('auto_order_flow_vehicle_data[vehicle_attributes][bullet_proof]', getValue('vehicleBulletProof'));
  }

  if (path === '/auto/order/payment_data/edit' || path === '/home/order/payment_data/edit' || path === '/life/order/payment_data/edit') {
    fill_in('credit_card_payment[credit_card][number]', '4111 1111 1111 1111');
    fill_in('credit_card_payment[credit_card][name]', 'John Doe');
    select('credit_card_payment[credit_card][due_date_month]', '5');
    select('credit_card_payment[credit_card][due_date_year]', '2018');
    fill_in('credit_card_payment[credit_card][cvv_number]', '123');
    $('[name="credit_card_payment[terms_of_service]"]').prop('checked', true);
  }

  if (path === '/home/order/edit') {
    fill_in('home_order_flow_pricing_requirements[lead_person_attributes][name]', getValue('leadName'));
    fill_in('home_order_flow_pricing_requirements[lead_person_attributes][phone]', getValue('leadPhone'));
    fill_in('home_order_flow_pricing_requirements[lead_person_attributes][email]', getValue('leadEmail'));

    select('home_order_flow_pricing_requirements[property_attributes][type_usage]', getValue('propertyTypeUsage'));
    fill_in('home_order_flow_pricing_requirements[property_attributes][price]', getValue('propertyValue'));
    fill_in('home_order_flow_pricing_requirements[property_attributes][address_attributes][zipcode]', getValue('propertyCep'));
  }

  if (path === '/home/order/insured_person_data/edit') {
    fill_in('home_order_flow_insured_person_data[insured_person_attributes][name]', getValue('insuredPersonName'));
    select('home_order_flow_insured_person_data[insured_person_attributes][gender]', getValue('insuredPersonGender'));
    fill_in('home_order_flow_insured_person_data[insured_person_attributes][cpf]', getValue('insuredPersonCpf'));
    fill_in('home_order_flow_insured_person_data[insured_person_attributes][date_of_birth]', getValue('insuredPersonDateOfBirth'));
    setJobRole('home_order_flow_insured_person_data[insured_person_attributes][occupation]', getValue('insuredPersonJobRole'));
    select('home_order_flow_insured_person_data[insured_person_attributes][salary_range]', getValue('insuredPersonSalaryRange'));
  }

  if (path === '/home/order/property_data/edit') {
    fill_in('home_order_flow_property_data[property_attributes][address_attributes][number]', getValue('insuredPersonAddressNumber'));
  }

  if (path === '/life/order/edit') {
    fill_in('life_order_flow_pricing_requirements[lead_person_attributes][name]', getValue('leadName'));
    fill_in('life_order_flow_pricing_requirements[lead_person_attributes][phone]', getValue('leadPhone'));
    fill_in('life_order_flow_pricing_requirements[lead_person_attributes][email]', getValue('leadEmail'));
    fill_in('life_order_flow_pricing_requirements[insured_person_attributes][date_of_birth]', getValue('insuredPersonDateOfBirth'));
    trigger('insured_person_date_of_birth');
    setJobRole('life_order_flow_pricing_requirements[insured_person_attributes][occupation]', getValue('insuredPersonJobRole'));
    select('life_order_flow_pricing_requirements[insured_person_attributes][salary_range]', getValue('insuredPersonSalaryRange'));
    select('life_order_flow_pricing_requirements[insured_person_attributes][has_mate]', getValue('insuredPersonHasMate'));
    if (getValue('insuredPersonHasMate') === 'true') {
      fill_in('life_order_flow_pricing_requirements[insured_person_mate_attributes][date_of_birth]', getValue('insuredPersonMateDateOfBirth'));
      trigger('insured_person_mate_date_of_birth');
      setJobRole('life_order_flow_pricing_requirements[insured_person_mate_attributes][occupation]', getValue('insuredPersonMateJobRole'));
    }
  }

  if (path === '/life/order/insured_person_data/edit') {
    fill_in('life_order_flow_insured_person_data[insured_person_attributes][name]', getValue('insuredPersonName'));
    fill_in('life_order_flow_insured_person_data[insured_person_attributes][cpf]', getValue('insuredPersonCpf'));
    trigger('insured_person_cpf');
    select('life_order_flow_insured_person_data[insured_person_attributes][gender]', getValue('insuredPersonGender'));
    fill_in('life_order_flow_insured_person_data[insured_person_attributes][address_attributes][zipcode]', getValue('insuredPersonCep'));
    trigger('mailing_address_cep');
    fill_in('life_order_flow_insured_person_data[insured_person_attributes][address_attributes][number]', getValue('insuredPersonAddressNumber'));
  }

  if (path === '/life/order/beneficiaries/edit') {
    fill_in('life_order_flow_beneficiaries[beneficiaries_attributes][0][name]', getValue('beneficiaryName'));
    fill_in('life_order_flow_beneficiaries[beneficiaries_attributes][0][relationship]', getValue('beneficiaryRelationship'));
    fill_in('life_order_flow_beneficiaries[beneficiaries_attributes][0][compensation]', getValue('beneficiaryCompensation'));
  }
});
