<template>
  <!-- =================== CUSTOMER DETAILS START =========================== -->
  <section class="customer-details">
    <div class="go-container">
      <div class="customer-details-content">
        <!-- CUSTOMER DETAILS HEADER -->
        <div class="customer-details-header">
          <h3 class="customer-details-title">Passengers Details</h3>
          <p class="customer-details-description">
            Please fill in with valid information. first served basis. We’ll
            send yours <br />
            right after you book.
          </p>
        </div>

        <!-- CUSTOMER DETAILS BODY -->
        <form @submit.prevent="payNow()" enctype="multipart/form-data">
          <div class="customer-details-body">
            <div class="row g-4">
              <div class="col-lg-8">
                <div class="details-container" v-for="(person, i) of passengers" :key="i">
                  <!-- Passenger 1   -->
                  <div class="guestinfo-card">
                    <div class="guestinfo-card-header">
                      <h3 class="guestinfo-card-title">
                        Passenger {{ i + 1 }} ({{
                          ageCategoryText(person.ageCategory)
                        }}) {{ i == 0 ? "(Primary Contact)" : "" }}
                      </h3>
                      <p class="guestinfo-card-text">
                        As mentioned on your passport or government approved IDs
                      </p>
                    </div>
                    <div class="guestinfo-card-body">
                      <div class="row">
                        <div class="col-lg-8">
                          <div class="row g-4">
                            <!-- title -->
                            <div class="col-lg-2">
                              <div class="input-box-2">
                                <div class="input-box2">
                                  <label for="guest1" class="input-label">Title
                                    <span class="text-danger"> * </span> :</label>
                                  <div class="select-wrapper">
                                    <div class="select">
                                      <div class="select-trigger">
                                        <span class="selectedvalue">{{
                                          person.title
                                        }}</span>

                                        <span class="arrow">
                                          <svg width="13" height="6" viewBox="0 0 13 6" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M0.958496 0L6.50016 6L12.0418 0H0.958496Z" fill="#B5B5BD" />
                                          </svg>
                                        </span>
                                      </div>

                                      <div class="custom-options">
                                        <span :class="[
                                              'custom-option',
                                              person.title == 'Mr' && 'selected',
                                            ]" @click="person.title = 'Mr'">Mr</span>
                                        <span :class="[
                                          'custom-option',
                                          person.title == 'Mrs' && 'selected',
                                        ]" @click="person.title = 'Mrs'">Mrs</span>
                                        <span :class="[
                                          'custom-option',
                                          person.title == 'Mstr' && 'selected',
                                        ]" @click="person.title = 'Mstr'">Mstr</span>
                                        <span :class="[
                                          'custom-option',
                                          person.title == 'Miss' && 'selected',
                                        ]" @click="person.title = 'Miss'">Miss</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- first name -->
                            <div class="col-lg-5">
                              <div class="input-box2">
                                <label for="first_name" class="input-label">Firtst Name
                                  <span class="text-danger"> * </span> :</label>
                                <input type="text" v-model="person.first_name" id="first_name" class="input-field"
                                  placeholder="First Name" @keyup="errors[i].first_name = false" />
                              </div>
                              <span class="text-danger small-text" v-if="errors[i].first_name">
                                First Name can not be null!
                              </span>
                            </div>
                            <!-- sur name name -->
                            <div class="col-lg-5">
                              <div class="input-box2">
                                <label for="sur_name" class="input-label">Surname
                                  <span class="text-danger"> * </span> :</label>
                                <input type="text" v-model="person.last_name" id="sur_name" class="input-field"
                                  placeholder="Surname" @keyup="errors[i].last_name = false" />
                              </div>
                              <span class="text-danger small-text" v-if="errors[i].last_name">
                                Surname can not be null!
                              </span>
                            </div>
                            <!-- gender -->
                            <div class="col-lg-6">
                              <div class="input-box2">
                                <label for="gender" class="input-label">Gender
                                  <span class="text-danger"> * </span> :</label>
                                <!-- trip radio buttons -->
                                <div class="trip-radios">
                                  <div class="customradio">
                                    <input type="radio" :id="'male-' + i" class="customradio-box" :name="'gender-' + i"
                                      v-model="person.gender" value="M" hidden />
                                    <label :for="'male-' + i" class="customradio-label">Male</label>
                                  </div>
                                  <div class="customradio">
                                    <input type="radio" :id="'female-' + i" class="customradio-box" :name="'gender-' + i"
                                      v-model="person.gender" value="F" hidden />
                                    <label :for="'female-' + i" class="customradio-label">Female</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- Nationality -->
                            <div class="col-lg-6">
                              <div class="input-box2">
                                <label for="guest1" class="input-label">Nationality
                                  <span class="text-danger"> * </span> :
                                </label>
                                <!-- custom select -->
                                <div class="select-wrapper">
                                  <div class="select">
                                    <div class="select-trigger">
                                      <span class="selectedvalue">
                                        {{
                                          person.nationalityName ||
                                          "-Select Nationality-"
                                        }}
                                      </span>

                                      <span class="arrow">
                                        <svg width="13" height="6" viewBox="0 0 13 6" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M0.958496 0L6.50016 6L12.0418 0H0.958496Z" fill="#B5B5BD" />
                                        </svg>
                                      </span>
                                    </div>

                                    <div class="custom-options">
                                      <span :class="[
                                        'custom-option',
                                        person.nationality == country.id &&
                                        'selected',
                                      ]" v-for="country of nationalities" :key="country.id" @click="() => {
  person.nationalityName = country.name;
  person.country_code =
    country.country_code;
  person.country_short_code =
    country.short_code;
  person.nationality = country.id;
  errors[i].nationality = false;
}
  ">
                                        {{ country.name }}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <span class="text-danger small-text" v-if="errors[i].nationality">
                                Nationality can not be null!
                              </span>
                            </div>
                            <!-- Mobile No -->
                            <div class="col-12" v-if="i == 0">
                              <div class="input-box2">
                                <label for="Mobile_number" class="input-label">Mobile Number
                                  <span class="text-danger"> * </span> :</label>
                                <input type="number" v-model="person.phone" @keydown="phoneValidation(person.phone, i)"
                                  @keyup="phoneValidation(person.phone, i)" class="input-field"
                                  placeholder="Your Mobile Number" />
                              </div>
                              <span class="text-danger small-text" v-if="errors[i].phone">
                                Mobile Number invalida or null!
                              </span>
                            </div>
                            <!-- date of birth  -->
                            <div class="col-lg-6">
                              <div class="input-box2">
                                <label :for="'dateofbirth-' + i" class="input-label">Date Of Birth
                                  <span class="text-danger"> * </span> :
                                </label>
                                <date-picker :id="'dateofbirth-' + i" class="input-field fullWidth"
                                  placeholder="DD/MM/YYYY" format="dd/MM/yyyy" v-model="person.date_of_birth"
                                  @selected="errors[i].date_of_birth = false" />
                              </div>
                              <span class="text-danger small-text" v-if="errors[i].date_of_birth">
                                Date Of Birth can not be null!
                              </span>
                            </div>
                            <!-- Passport Number  -->
                            <div class="col-lg-6">
                              <div class="input-box2">
                                <label :for="'passport-' + i" class="input-label">Passport Number
                                  <span v-if="!isDomestic" class="text-danger"> * </span> :
                                </label>
                                <input type="text" name="passport_number" :id="'passport-' + i" class="input-field"
                                  placeholder="Passport Number" v-model="person.passport_number"
                                  @keyup="errors[i].passport_number = false" />
                              </div>
                              <span class="text-danger small-text" v-if="errors[i].passport_number">
                                Passport Number can not be null!
                              </span>
                            </div>
                            <!-- Passport Expire Date  -->
                            <div class="col-lg-6">
                              <div class="input-box2">
                                <label :for="'passport_expire-' + i" class="input-label">Passport Expiry Date
                                  <span v-if="!isDomestic" class="text-danger"> * </span> :
                                </label>
                                <date-picker :id="'passport_expire-' + i" class="input-field fullWidth"
                                :disabledDates="disabledDates"
                                  placeholder="DD/MM/YYYY" format="dd/MM/yyyy" v-model="person.passport_expire"
                                  @selected="errors[i].passport_expire = false" />
                              </div>
                              <span class="text-danger small-text" v-if="errors[i].passport_expire">
                                Passport expiry date can not be null!
                              </span>
                            </div>
                            <!-- Frequent Flyer Number (If any)  -->
                            <div class="col-lg-6">
                              <div class="input-box2">
                                <label for="flyer_number" class="input-label">Frequent Flyer Number (If any)
                                </label>
                                <input type="text" name="flyer_number" id="flyer_number" class="input-field"
                                  placeholder="Frequent Flyer Number " v-model="person.flyer_number" />
                              </div>
                            </div>
                            <!-- Email  -->
                            <div class="col-lg-6">
                              <div class="input-box2">
                                <label class="input-label">Email </label>
                                <input type="email" v-model="person.email" @keyup="errors[i].email = false"
                                  class="input-field" placeholder="Email" />
                              </div>
                              <span class="text-danger small-text" v-if="errors[i].email">
                                Email can not be null!
                              </span>
                            </div>
                            <!-- Passport -->
                            <div class="col-lg-6">
                              <div class="input-box2">
                                <p class="input-label">Passport Copy (max 2 MB) <span class="text-danger"> * </span></p>
                                <input type="file" name="passport_attachment" :id="'passport_attachment-' + i"
                                  class="input-field" placeholder="passport" hidden @change="imageUpload" />
                                <label :for="'passport_attachment-' + i" class="upload-box">
                                  <span class="file-placeholder">JPG/ JPEG/ PDF</span>
                                  <div class="upload-file-btn">
                                    <span>
                                      <svg width="12" height="14" viewBox="0 0 12 14" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                          d="M8 1.66634H1.33333V12.333H10.6667V4.33301H8V1.66634ZM0 0.994341C0 0.629008 0.298 0.333008 0.666 0.333008H8.66667L12 3.66634V12.995C12.0006 13.0826 11.984 13.1694 11.951 13.2505C11.9181 13.3316 11.8695 13.4054 11.808 13.4678C11.7466 13.5301 11.6734 13.5797 11.5928 13.6138C11.5121 13.6479 11.4255 13.6657 11.338 13.6663H0.662C0.486919 13.6651 0.319345 13.5951 0.195478 13.4713C0.0716119 13.3476 0.00139643 13.1801 0 13.005V0.994341ZM6.66667 6.99967V9.66634H5.33333V6.99967H3.33333L6 4.33301L8.66667 6.99967H6.66667Z"
                                          fill="white" />
                                      </svg>
                                    </span>
                                    <span>Upload</span>
                                  </div>
                                </label>
                                <p v-if="person.passport_file_short_name && !errors[i].passport_attachment"
                                  class="text-success" :title="person.passport_file_short_name">
                                  <small>
                                    <span>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 17"
                                        fill="currentColor" class="bi bi-file-plus">
                                        <path
                                          d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z" />
                                        <path
                                          d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                                      </svg>
                                    </span>
                                    {{ person.passport_file_short_name }}
                                  </small>
                                </p>
                                <p v-if="errors[i].passport_attachment" class="text-danger">
                                  <small>
                                    <span>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 17"
                                        fill="currentColor" class="bi bi-file-plus">
                                        <path
                                          d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z" />
                                        <path
                                          d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                                      </svg>
                                    </span>
                                    {{ errors[i].passport_attachment }}
                                  </small>
                                </p>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Let us know   -->
                  <div class="guestinfo-card mb-3">
                    <div class="accordion" :id="'accordionExample-' + i">
                      <div class="accordion-item no-border">
                        <div class="guestinfo-card-header" id="headingOne">
                          <h3 class="guestinfo-card-title accordion-button px-0 no-bg no-border no-box-shadow"
                            role="button" data-bs-toggle="collapse" :data-bs-target="'#collapseOne-' + i"
                            aria-expanded="true" aria-controls="collapseOne">
                            Let us know what you need
                          </h3>
                          <p class="guestinfo-card-text">
                            Meal and Wheelchair services are accessible if
                            provided by the airlines. <br />
                            (Depends on availability)
                          </p>
                        </div>
                        <div :id="'collapseOne-' + i" class="guestinfo-card-body accordion-collapse collapse show pt-2"
                          aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                          <div class="row">
                            <div class="col-lg-8">
                              <div class="row g-4">
                                <!-- Request wheelchair (Optional) -->
                                <div class="col-12">
                                  <div class="input-box2">
                                    <label for="wheelchair" class="input-label">Request wheelchair (Optional)</label>
                                    <div class="customradio">
                                      <input type="radio" :id="'wheelchair-1-' + i" class="customradio-box"
                                        :name="'wheelchair-' + i" value="" hidden v-model="person.wheelchair" />
                                      <label :for="'wheelchair-1-' + i" class="customradio-label">None</label>
                                    </div>
                                    <div class="customradio">
                                      <input type="radio" :id="'wheelchair-2-' + i" class="customradio-box"
                                        :name="'wheelchair-' + i" value="WCHR" hidden v-model="person.wheelchair" />
                                      <label :for="'wheelchair-2-' + i" class="customradio-label">Passenger can not walk
                                        short distance up
                                        or down stairs.</label>
                                    </div>
                                    <div class="customradio">
                                      <input type="radio" :id="'wheelchair-3-' + i" class="customradio-box"
                                        :name="'wheelchair-' + i" value="WCHS" hidden v-model="person.wheelchair" />
                                      <label :for="'wheelchair-3-' + i" class="customradio-label">Passenger can not walk
                                        short distance,
                                        but not up or down stairs</label>
                                    </div>
                                    <div class="customradio">
                                      <input type="radio" :id="'wheelchair-4-' + i" class="customradio-box"
                                        :name="'wheelchair-' + i" value="WCHC" hidden v-model="person.wheelchair" />
                                      <label :for="'wheelchair-4-' + i" class="customradio-label">Passenger cannot walk
                                        any
                                        distance and
                                        will require the aisle chair to
                                        board.</label>
                                    </div>
                                    <div class="customradio">
                                      <input type="radio" :id="'wheelchair-5-' + i" class="customradio-box"
                                        :name="'wheelchair-' + i" value="WCOB" hidden v-model="person.wheelchair" />
                                      <label :for="'wheelchair-5-' + i" class="customradio-label">On-board aisle
                                        wheelchair
                                        requested</label>
                                    </div>
                                    <div class="customradio">
                                      <input type="radio" :id="'wheelchair-6-' + i" class="customradio-box"
                                        :name="'wheelchair-' + i" value="WCMP" hidden v-model="person.wheelchair" />
                                      <label :for="'wheelchair-6-' + i" class="customradio-label">Passenger is traveling
                                        with a manual
                                        wheelchair.</label>
                                    </div>
                                  </div>
                                </div>

                                <!-- Select meal type (Optional) -->

                                <div class="col-12">
                                  <div class="input-box2">
                                    <label for="guest1" class="input-label">Select meal type (Optional)</label>
                                    <div class="customradio">
                                      <input type="radio" :id="'meal-1-' + i" class="customradio-box" :name="'meal-' + i"
                                        value="" hidden v-model="person.meal" />
                                      <label :for="'meal-1-' + i" class="customradio-label">None</label>
                                    </div>
                                    <div class="customradio">
                                      <input type="radio" :id="'meal-2-' + i" class="customradio-box" :name="'meal-' + i"
                                        value="AVML" hidden v-model="person.meal" />
                                      <label :for="'meal-2-' + i" class="customradio-label">ASIAN VEGETARIAN MEAL</label>
                                    </div>
                                    <div class="customradio">
                                      <input type="radio" :id="'meal-3-' + i" class="customradio-box" :name="'meal-' + i"
                                        value="BBML" hidden v-model="person.meal" />
                                      <label :for="'meal-3-' + i" class="customradio-label">INFANT/BABY FOOD</label>
                                    </div>
                                    <div class="customradio">
                                      <input type="radio" :id="'meal-4-' + i" class="customradio-box" :name="'meal-' + i"
                                        value="CHML" hidden v-model="person.meal" />
                                      <label :for="'meal-4-' + i" class="customradio-label">CHILD MEAL</label>
                                    </div>
                                    <div class="customradio">
                                      <input type="radio" :id="'meal-5-' + i" class="customradio-box" :name="'meal-' + i"
                                        value="DBML" hidden v-model="person.meal" />
                                      <label :for="'meal-5-' + i" class="customradio-label">DIABETIC MEAL</label>
                                    </div>
                                    <div class="customradio">
                                      <input type="radio" :id="'meal-6-' + i" class="customradio-box" :name="'meal-' + i"
                                        value="SFML" hidden v-model="person.meal" />
                                      <label :for="'meal-6-' + i" class="customradio-label">SEA FOOD MEAL</label>
                                    </div>
                                    <div class="customradio">
                                      <input type="radio" :id="'meal-7-' + i" class="customradio-box" :name="'meal-' + i"
                                        value="MOML" hidden v-model="person.meal" />
                                      <label :for="'meal-7-' + i" class="customradio-label">MOSLEM MEAL</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="guestinfo-card">
                  <!-- coupon box -->
                  <div class="coupon">
                    <h4 class="coupon-title">Have a coupon?</h4>
                    <div class="coupon-box">
                      <input type="text" placeholder="Write down your coupon code" v-model="coupon.code"
                        class="inputfield" @keyup="couponOnchange" />
                      <button type="button" class="btn-coupon" @click="applyCoupon">
                        Apply
                      </button>
                    </div>
                    <p class="text-success" v-if="coupon.success">
                      <small> Coupon Added. </small>
                    </p>
                    <p class="text-danger" v-if="coupon.error">
                      <small> {{ coupon.error }} </small>
                    </p>
                  </div>

                  <!-- fare summery -->

                  <div class="fare-summery">
                    <div class="fare-summery-header">
                      <h4 class="fare-title">Fare Summary</h4>
                      <div class="row">
                        <div :class="['col-lg-12', sIndex == 0 && checkout?.directions.length > 1 && 'border-bottom']"
                          v-for="(data, sIndex) of checkout?.directions" :key="sIndex">
                          <div class="flight-duration duration-for-info mt-2">
                            <div class="top-row">
                              <div class="left">
                                <span>
                                  <svg width="21" height="22" viewBox="0 0 21 22" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M1.25977 21.0069V18.6684H19.2598V21.0069H1.25977ZM3.10977 15.1607L0.259766 9.48993L1.80977 9.13916L3.55977 10.9515L8.35977 9.43147L4.30977 1.42224L6.25977 0.720703L13.1098 7.91147L18.1098 6.33301C18.6431 6.15763 19.1264 6.27455 19.5598 6.68378C19.9931 7.09301 20.2098 7.63865 20.2098 8.3207C20.2098 8.74942 20.0974 9.12942 19.8728 9.4607C19.6474 9.79198 19.3598 10.0161 19.0098 10.133L3.10977 15.1607Z"
                                      fill="#4A5568" />
                                  </svg>
                                </span>
                              </div>
                              <div class="middle">
                                <span class="stops" v-if="data?.segments.length > 1">
                                  {{ data?.segments.length - 1 }} Stops
                                </span>
                                <span class="stops" v-else> Nonstop </span>
                              </div>
                              <div class="right">
                                <span>
                                  <svg width="19" height="23" viewBox="0 0 19 23" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M0.667969 22.9712V20.6328H18.668V22.9712H0.667969ZM16.518 17.0082L0.667969 11.8636V5.43278L2.16797 6.0174L2.86797 8.47278L7.66797 10.0512V0.755859L9.66797 1.34047L12.418 11.5712L17.418 13.2082C17.8013 13.3251 18.1056 13.5636 18.331 13.9237C18.5556 14.2846 18.668 14.6892 18.668 15.1374C18.668 15.7805 18.443 16.2969 17.993 16.6866C17.543 17.0764 17.0513 17.1836 16.518 17.0082Z"
                                      fill="#4A5568" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                            <div class="middle-row">
                              <div class="left">
                                <span class="location">
                                  {{ data.from }}
                                </span>
                              </div>
                              <div class="middle">
                                <div class="arrow-container">
                                  <div class="arrow-line" v-if="data.segments.length > 1">
                                    <div class="round" v-for="(
                                      segment, segmentIndex
                                    ) of data.segments.slice(1)" :key="segmentIndex" data-bs-toggle="tooltip"
                                      data-bs-placement="top" :data-bs-title="[
                                        layoverAtStop(
                                          data.segments,
                                          segmentIndex + 1
                                        ) +
                                        ' at ' +
                                        segment.from,
                                      ]">
                                      <div class="content">
                                        {{ segment.from }}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="arrow-line" v-else></div>
                                  <div class="arrow"></div>
                                </div>
                              </div>
                              <div class="right">
                                <span class="location">
                                  {{ data.to }}
                                </span>
                              </div>
                            </div>

                            <div class="bottom-row">
                              <div class="left">
                                <span class="time text-nowrap">
                                  {{
                                    getTimeValue(data.segments[0]?.departure)
                                  }}
                                  <br />
                                  <small class="small-text text-nowrap">
                                    {{
                                      getDateValue(data.segments[0]?.departure)
                                    }}
                                  </small>
                                </span>
                              </div>
                              <div class="middle">
                                <span class="stops">{{ totalFlightTime(data.segments) }}
                                </span>
                              </div>
                              <div class="right">
                                <span class="time text-nowrap">
                                  {{ getTimeValue(data.segments[data.segments.length - 1]
                                    ?.arrival) }}
                                  <br />
                                  <!-- v-if="data.segments.length > 1" -->
                                  <small class="small-text text-nowrap">
                                    {{
                                      getDateValue(
                                        data.segments[data.segments.length - 1]
                                          ?.arrival
                                      )
                                    }}
                                  </small>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="fare-summery-body">
                      <div class="card-paynow">
                        <div class="payment-header">
                          <span>Details</span>
                          <span>Amount</span>
                        </div>
                        <!-- single item -->
                        <div class="paument-item" v-if="checkout?.bookingComponents?.passengerFares?.ADT">
                          <div>
                            <p>
                              <strong>Adult {{ checkout?.passengers.adt }}</strong>
                            </p>
                            <p>Base Fare x {{ checkout?.passengers.adt }}</p>
                            <p>Tax x {{ checkout?.passengers.adt }}</p>
                          </div>
                          
                          <div>
                            <p>
                              {{ currency }}
                              {{
                                price(
                                  checkout?.bookingComponents?.passengerFares?.ADT
                                    ?.basePrice,
                                  "num"
                                )
                              }}
                            </p>
                            <p>
                              {{ currency }}
                              {{
                                price(
                                  checkout?.bookingComponents?.passengerFares?.ADT
                                    ?.taxes,
                                  "num"
                                )
                              }}
                            </p>
                          </div>
                        </div>
                        <!-- single item -->
                        <div class="paument-item" v-if="checkout?.bookingComponents?.passengerFares?.CNN">
                          <div>
                            <p>
                              <strong>Child {{ checkout?.passengers.cnn }}</strong>
                            </p>
                            <p>Base Fare x {{ checkout?.passengers.cnn }}</p>
                            <p>Tax x {{ checkout?.passengers.cnn }}</p>
                          </div>
                          <div>
                            <p>
                              {{ currency }}
                              {{
                                price(
                                  checkout?.bookingComponents?.passengerFares?.CNN
                                    ?.basePrice,
                                  "num"
                                )
                              }}
                            </p>
                            <p>
                              {{ currency }}
                              {{
                                price(
                                  checkout?.bookingComponents?.passengerFares?.CNN
                                    ?.taxes,
                                  "num"
                                )
                              }}
                            </p>
                          </div>
                        </div>
                        <!-- single item -->
                        <div class="paument-item" v-if="checkout?.bookingComponents?.passengerFares?.INF">
                          <div>
                            <p>
                              <strong>Infant {{ checkout?.passengers.inf }}</strong>
                            </p>
                            <p>Base Fare x {{ checkout?.passengers.inf }}</p>
                            <p>Tax x {{ checkout?.passengers.inf }}</p>
                          </div>
                          <div>
                            <p>
                              {{ currency }}
                              {{
                                price(
                                  checkout?.bookingComponents?.passengerFares?.INF
                                    ?.basePrice,
                                  "num"
                                )
                              }}
                            </p>
                            <p>
                              {{ currency }}
                              {{
                                price(
                                  checkout?.bookingComponents?.passengerFares?.INF
                                    ?.taxes,
                                  "num"
                                )
                              }}
                            </p>
                          </div>
                        </div>

                        <div class="paument-item">
                          <span>Total Airfare</span>
                          <span>
                            BDT {{ price(checkout?.bookingComponents?.price?.totalPrice, "num") }}
                          </span>
                        </div>
                        <div class="paument-item" v-if="tsDiscount > 0">
                          <span>TS Discount</span>
                          <span>- BDT {{ tsDiscount }}</span>
                        </div>
                        <div class="paument-item" v-else>
                          <span title="Advance Income Tax">AIT Fee</span>
                          <span> BDT {{ tsDiscount * (-1) }}</span>
                        </div>
                        <div class="paument-item" v-if="coupon.response.id">
                          <span class="product-name"> Coupon Discount </span>
                          <span class="product-quantity">
                            "{{ coupon.code }}"
                          </span>
                          <span class="product-price">
                            - BDT {{ coupon.response.discount }}
                          </span>
                        </div>
                        <div class="paument-item" v-if="convenience > 0">
                          <span>TS Convenience Fee</span>
                          <span> BDT {{ convenience }}</span>
                        </div>
                        <div class="paument-item" v-if="sslFeeStatus">
                          <span>Payment Gateway Fee</span>
                          <span> BDT {{ sslFee }}</span>
                        </div>
                        <p v-if="userInfo.customer_type == 'B2B' && instant_issue" class="text-success">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-check-all" viewBox="0 0 16 16">
                            <path
                              d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                          </svg> Instant ticket issue
                        </p>
                        <p v-if="userInfo.customer_type == 'B2B' && !instant_issue">
                          <label class="pe-4"> <input type="radio" name="is_booking" v-model="is_booking" value="1">
                            Reserve a Booking </label>
                          <label> <input type="radio" name="is_booking" v-model="is_booking" value="0"> Purchase Tickets
                          </label>
                        </p>
                        <p><small><label :class="[terms_condition_error && 'was-validated']"><input type="checkbox"
                                class="form-check-input" required v-model="terms_condition"
                                @click="terms_condition_error = false" /> I accept the <nuxt-link
                                to="/page/terms-and-conditions">Terms of Condition</nuxt-link>, <nuxt-link
                                to="/page/privacy-policy">Privacy Policy</nuxt-link> and <nuxt-link
                                to="/page/refund-policy">Refund Policy</nuxt-link> </label></small></p>
                        <p class="text-danger" v-if="terms_condition_error"><small>Review terms, privacy and refund
                            policy</small></p>
                        <button type="submit" class="payment-btn">
                          <span v-if="userInfo.customer_type == 'B2B'">
                            <span v-if="is_booking == 1"> Book </span> <span v-else>Pay</span> Now</span>
                          <span v-else>Pay Now</span>
                          <span class="total">BDT {{ finalPrice.toLocaleString() || "" }}</span>
                        </button>
                        <p class="text-danger" v-if="!isSubmit"> Please fill in with valid information </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
  <!-- =================== CUSTOMER DETAILS END=========================== -->
</template>
<script>
import jsonParse from "/static/utils/jsonParse.js";
export default {
  middleware: "auth",
  name: "Flight-Booking",
  head() {
    return {
      title: "Flight Booking",
      meta: [
        {
          hid: "Description",
          name: "description",
          content: "Flight Booking",
        },
      ],
    };
  },
  data() {
    return {
      checkout: {},
      errors: [],
      coupon: {
        code: "",
        error: "",
        success: false,
        response: {
          id: "",
          discount: 0,
        },
      },
      nationalities: [],
      userInfo: {},
      passengers: [],
      requiredFields: [
        "first_name",
        "last_name",
        "date_of_birth",
        "nationality",
        "passport_attachment",
      ],
      terms_condition: false,
      is_booking: 1,
      instant_issue: false,
      terms_condition_error: false,
      isSubmit: true,
      moneyRate: 0,
      isDomestic: true,
      domesticAirport: ["BZL", "CGP", "DAC", "ZYL", "JSR", "SPD", "CXB", "RJH"],
      balance: 0,
      all_price:{
        base:0,
        ts_discount:0,
        tax:0,
        ait_vat:0,
        pg_fee:0
      },
      disabledDates: {
        to: new Date(Date.now() - 8640000),
      },

    };
  },
  mounted() {
    this.getLocalData();
    this.getUser();
    this.getNationality();
    // After calculating number of travellers
    window.setTimeout(() => {
      this.rawJsSelect();
    }, 300);
    //console.log(this.userInfo)
    this.domesticCheck();
    this.getBalance();
    this.currencyConvert();
    this.getReservationStatus();
  },
  computed: {
    currency() {
      let price = this.checkout?.bookingComponents?.price?.totalPrice;
      let num = price.replace(/^\D+/g, "");
      let currency = price.replace(num, "");
      return currency;
    },
    baseCurrency() {
      let price = this.checkout?.bookingComponents?.price?.basePrice;
      let num = price.replace(/^\D+/g, "");
      let currency = price.replace(num, "");
      return currency;
    },
    platingCarrier() {
      if (this.checkout?.directions?.length > 0) {
        return this.checkout?.directions[0]?.platingCarrier
      }
      return "";
    },
    // Price for B2B users, when no need payment gateway charge
    priceWithoutPG() {
      let price = this.price(
        this.checkout?.bookingComponents?.price?.totalPrice,
        "num"
      );
      if (this.coupon.response.total_amount) {
        price = this.coupon.response.total_amount;
      } else if (this.tsDiscount) {
        price -= parseInt(this.tsDiscount);
      }
      if (this.convenience) {
        price += parseInt(this.convenience);
      }
      return price;
    },
    finalPrice() {
      if (this.userInfo.customer_type == 'B2B') {
        this.all_price.pg_fee = 0;
        return Math.round(this.priceWithoutPG);
      } else {
        let pgFee = (this.priceWithoutPG / 100) * this.sslRate;
        this.all_price.pg_fee = Math.round(pgFee);
        return Math.round(this.priceWithoutPG + pgFee);
      }
    },
    sslFeeStatus() {
      if (this.userInfo.customer_type == 'B2B') {
        return 0;
      }
      return 1;
    },
    tsDiscount() {
      let totalPrice = this.price(
        this.checkout?.bookingComponents?.price?.totalPrice,
        "num"
      );
      let tax = this.price(
        this.checkout?.bookingComponents?.price?.taxes,
        "num"
      );
      let basePrice = totalPrice - tax;
      this.all_price.base = basePrice;
      let ts_discount = 0;
      // if the flight is not fly dubai, its subtruct (7%) commission
      if (this.noCommission == false) {
        // subtruct (7%) commission
        ts_discount = ((basePrice / 100) * process.env.commission_percent);
      }
      basePrice = basePrice - ts_discount;

      let total = tax + basePrice;
      // add (0.3%) AIT tax
      let ait_vat = ((total / 100) * process.env.ait_tax);
      total = total + ait_vat;

      // All price store to object
      this.all_price.ts_discount = Math.round(ts_discount);
      this.all_price.tax = tax;
      this.all_price.ait_vat = Math.round(ait_vat);
      return Math.round(totalPrice - total);
    },
    sslRate() {
      return process.env.ssl_fee || 0;
    },
    sslFee() {
      return Math.round((this.priceWithoutPG / 100) * this.sslRate);
    },
    convenience() {
      return this.isDomestic ? process.env.domestic_convenience : process.env.int_convenience;
    },
    noCommission() {
      // if load directions
      if (this.checkout.directions) {
        let firstDerection = this.checkout.directions[0];
        // if first airline is Fly Dubai, it have no commission although from bangladesh airport
        if (firstDerection.platingCarrier == "FZ") {
          return true;
        }
        // No commission air if first departure from non bangladesh airport
        const noCommissionAir = ['SQ', 'CZ', 'MU'];

        // if first airline match noCommissionAir and first departure from non bangladesh airport, it have no commission
        if (noCommissionAir.indexOf(firstDerection.platingCarrier) != -1 && this.domesticAirport.indexOf(firstDerection.from) == -1) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    }

  },
  methods: {
    getReservationStatus() {
      let departure = this.checkout?.directions[0]?.segments[0]?.departure
      const departureTime = new Date(departure);
      // Current time
      const currentTime = new Date();
      // Calculate the difference in milliseconds
      const timeDifference = departureTime.getTime() - currentTime.getTime();
      // Check if the difference is less than 24 hours (in milliseconds)
      const isWithin24Hours = timeDifference <= 24 * 60 * 60 * 1000;

      if (isWithin24Hours) {
        this.is_booking = 0;
        this.instant_issue = true;
      }

    },
    domesticCheck() {
      let isDomesticAir = true;
      for (let dir of this.checkout.directions) {
        if (this.domesticAirport.indexOf(dir.from) == -1) {
          isDomesticAir = false;
          break;
        }
        if (this.domesticAirport.indexOf(dir.to) == -1) {
          isDomesticAir = false;
          break;
        }
      }
      this.isDomestic = isDomesticAir;
    },

    payNow() {
      if (this.userInfo.customer_type == 'B2B') {
        if (this.is_booking == 0 && this.balance < this.finalPrice) {
          this.$toast.warning("You have no sufficient balance.");
          this.$router.push("/mybalance");
          return;
        }
      }
      this.isSubmit = true;
      if (this.terms_condition == false) {
        this.isSubmit = false;
        this.terms_condition_error = true;
      }
      this.passengers.forEach((person, i) => {

        // Contact person phone validation
        if (i == 0 && (person["phone"] == "" || person["phone"] == undefined || person["phone"].length < 10)) {
          this.errors[0].phone = true;
          this.isSubmit = false;
        }
        // if flight not a domestic flight passport number required
        if (!this.isDomestic) {
          this.requiredFields.push("passport_number");
          this.requiredFields.push("passport_expire");
        }
        // Required Fields Validation
        this.requiredFields.forEach((field) => {
          if (person[field] == "" || person[field] == undefined) {
            if (field == 'passport_attachment') {
              this.errors[i][field] = "Passport can not be null!";
            } else {
              this.errors[i][field] = true;
            }
            this.isSubmit = false;
          } else {
            if (field == "date_of_birth") {
              person[field] = this.$moment(
                person[field],
                "YYYY-MM-DD"
              ).format("YYYY-MM-DD");
            }
            if (field == "passport_expire") {
              person[field] = this.$moment(
                person[field],
                "YYYY-MM-DD"
              ).format("YYYY-MM-DD");
            }
          }
        });
      });

      let primaryContact = {
        countryCode: "",
        number: "",
        email: "",
        location: "",
      };
      if (this.isSubmit) {
        primaryContact = {
          countryCode: this.passengers[0].country_code,
          number: this.passengers[0].phone,
          email: this.passengers[0].email,
          location: this.checkout?.directions[0]?.from || "DAC",
        };
        const booking = {
          customer: this.userInfo.id,
          booking_data: {
            directions: this.checkout.directions,
            passengers: this.passengers,
            primaryContact,
            total_amount: this.finalPrice,
            coupon: this.coupon.response?.id || "",
            discount_amount: this.coupon.response?.discount || 0,
            convenience_fee: this.convenience,
            url: `${process.env.ROOT_URL}/booking/flight`,
            all_price:this.all_price
          },
        };
        this.$axios
          .post("/flight-booking", booking, header)
          .then((res) => {
            this.$log(res.data);
            if (res.data.status == "SUCCESS" || res.data.status == "success") {
              //this.$router.push(`/booking/flight?booking_id=${res.data.booking_id}`);
              if (this.userInfo.customer_type == 'B2B') {
                this.b2bFundDeduction(res.data.booking_id);
              } else {
                localStorage.removeItem("flightBooking");
                window.location.href = res.data?.gateway_url;
              }
            }
          })
          .catch((err) => {
            this.$elog(err.response.data);
          });

      }
    },
    async b2bFundDeduction(bookingId) {
      let body = {
        "flight_booking_id": bookingId,
        "amount": this.finalPrice,
        "note": "Flight Booking",
        "pending_status": "pending"
      }
      this.$axios
        .post('/customer-b2b-balance', body)
        .then((res) => {
          this.$router.push(`/booking/flight?booking_id=${bookingId}&is_booking=${this.is_booking}`);
        })
        .catch((err) => {
          this.$elog(err);

        });
    },
    phoneValidation(phone, i) {
      if (phone.length < 10) {
        this.errors[i].phone = true;
      } else {
        this.errors[i].phone = false;
      }

    },
    // apply Coupon
    applyCoupon() {
      if (this.coupon.code == "") {
        this.coupon.error = "Empty field not allow!";
      } else {
        let totalPrice = this.price(
          this.checkout?.bookingComponents?.price?.totalPrice,
          "num"
        ) - this.tsDiscount;
        this.$axios
          .post("/apply-coupon/", {
            coupon_code: this.coupon.code,
            total_amount: totalPrice,
          })
          .then((response) => {
            if (response.data?.message) {
              this.coupon.error = response.data?.message;
            } else {
              console.log(response.data)
              this.coupon.success = true;
              this.coupon.response = response.data;
              this.coupon.response.discount = Math.floor(response.data?.discount)
            }
          })
          .catch((error) => {
            this.coupon.error = "Invalid coupon code!";
            this.$elog(error.response);
          });
      }
    },
    // coupon on change event
    couponOnchange() {
      this.coupon.error = "";
    },
    getLocalData() {
      let checkout = {};
      if (localStorage.getItem("flightBooking") != null) {
        checkout = jsonParse(localStorage.getItem("flightBooking"));
      }
      if (checkout?.passengers) {
        this.checkout = checkout;
        this.$log(this.checkout)
        if (parseInt(checkout.passengers.adt) > 0) {
          this.makePassengersArray(checkout.passengers.adt, "ADT");
        }
        if (parseInt(checkout.passengers.cnn) > 0) {
          this.makePassengersArray(checkout.passengers.cnn, "CNN", checkout.passengers.childDob);
        }
        if (parseInt(checkout.passengers.inf) > 0) {
          this.makePassengersArray(checkout.passengers.inf, "INF");
        }
      } else {
        this.$router.push("/");
      }
    },
    makePassengersArray(total, type, childDob = '') {
      for (let i = 0; i < parseInt(total); i++) {
        let newObject = {
          title: "Mr",
          first_name: "",
          last_name: "",
          gender: "M",
          nationality: "",
          country_short_code: "",
          country_code: "",
          nationalityName: "",
          phone: "",
          date_of_birth: "",
          flyer_number: "",
          email: "",
          passport_number: "",
          passport_expire: "",
          passport_attachment: "",
          passport_file_short_name: "",
          ageCategory: type,
          wheelchair: "",
          meal: "",
        };
        if (type == "CNN") {
          newObject.date_of_birth = childDob[i]
        }
        this.passengers.push(newObject);

        // Errors field add for showing error message.
        let errors = {};
        this.requiredFields.forEach((field) => {
          errors[field] = false;
        });
        errors.passport_attachment = false;
        this.errors.push(errors);
      }
    },
    primaryUserDefault() {
      this.passengers[0].first_name = this.userInfo?.user?.first_name;
      this.passengers[0].last_name = this.userInfo?.user?.last_name;
      this.passengers[0].title = this.userInfo?.title;
      this.passengers[0].gender = this.userInfo?.gender == "Male" ? 'M' : 'F';
      this.passengers[0].phone = this.userInfo?.phone_number;
      this.passengers[0].date_of_birth = this.userInfo?.birthdate;
      this.passengers[0].passport_number = this.userInfo?.passport_number;
      this.passengers[0].passport_attachment = "";
      this.passengers[0].passport_file_short_name = "";
      this.passengers[0].email = this.userInfo?.user?.email;
    },
    getTimeValue(timeString) {
      const datePortion = timeString.split("T")[0];
      const timePart = timeString.split("T")[1].split(".")[0];
      // Create a Date object from the time string
      const date = new Date(`${datePortion}T${timePart}`);

      // Get the hour and minute
      let hours = date.getHours();
      const minutes = date.getMinutes();

      // Format the time to include AM/PM
      let ampm = "AM";
      if (hours >= 12) {
        ampm = "PM";
        if (hours > 12) {
          hours -= 12;
        }
      }
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    },
    getDateValue(timeString) {
      // Your time string
      const datePortion = timeString.split("T")[0];

      // Create a Date object from the time string
      const date = new Date(datePortion);
      // Get the year, month, and day
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are 0-based, so add 1 to get the correct month
      const day = date.getDate();
      return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

    },
    layoverAtStop(segments, index) {
      let firstTime = segments[index - 1]?.arrival;
      let lastTime = segments[index]?.departure;
      firstTime = new Date(firstTime).toUTCString();
      lastTime = new Date(lastTime).toUTCString();
      const startTime = this.$moment(firstTime);
      const endTime = this.$moment(lastTime);
      const minutesDiff = endTime.diff(startTime, "minutes");

      return `${this.minutesToTime(minutesDiff)} layover`;
    },
    totalFlightTime(segments) {
      let sLength = segments.length - 1;
      let firstTime = segments[0]?.departure;
      let lastTime = segments[sLength]?.arrival;
      firstTime = new Date(firstTime).toUTCString();
      lastTime = new Date(lastTime).toUTCString();

      const startTime = this.$moment(firstTime);
      const endTime = this.$moment(lastTime);
      const minutesDiff = endTime.diff(startTime, "minutes");
      return this.minutesToTime(minutesDiff);
    },
    minutesToTime(minutes) {
      let duration = this.$moment.duration(minutes, "minutes");
      let days = duration.days();
      let hours = duration.hours();
      let minute = duration.minutes();
      let time = "";
      if (days > 0) {
        time = `${days}d `;
      }
      if (hours > 0) {
        time += `${hours}h `;
      }
      if (minute > 0) {
        time += `${minute}m`;
      }
      return time;
    },
    price(price = "", attr = "") {
      let num = price.replace(/^\D+/g, "");
      let currency = price.replace(num, "");
      if (currency != "BDT" && currency != "") {
        num = parseFloat(num) * parseFloat(this.moneyRate);
        console.log(this.moneyRate);
      }
      if (attr == "") {
        return currency + " " + num;
      } else if (attr == "num") {
        return parseInt(Math.ceil(num));
      } else {
        return currency;
      }

    },
    async currencyConvert() {

      const response = await this.$Api.post(
        "/utils/currency-convert", { from: this.baseCurrency, to: 'BDT' }
      );
      this.moneyRate = response.data?.rate || 0;
      this.$log(this.moneyRate);
    },
    getNationality() {
      this.$axios
        .get("/nationalities")
        .then((res) => {
          this.nationalities = res.data?.results || [];
        })
        .catch((err) => {
          this.$elog(err.response.status);
        });
    },
    getUser() {
      this.$axios
        .get("/user")
        .then((res) => {
          this.userInfo = res.data;
          this.$log(res.data);
          if (res.data.phone_number == "") {
            this.$toast.warning("Complete your profile, please.");
            this.$router.push("/profile/edit");
            return;
          }
          this.primaryUserDefault();
        })
        .catch((err) => {
          this.$log(err.response);
        });
    },
    async getBalance() {
      this.$axios
        .get(`/customer-b2b-balance`)
        .then((res) => {
          this.balance = res.data?.current_balance
        })
        .catch((err) => {
          this.$elog(err.response.data);

        });
    },
    ageCategoryText(type) {
      let ageCategory = {
        ADT: "Adult",
        CNN: "Child",
        INF: "Infant",
      };
      return ageCategory[type];
    },
    travelTime(details) {
      for (let i in details) {
        return details[i]?.travelTime;
      }
    },
    rawJsSelect() {
      const selectWrapper = document.querySelectorAll(".select-wrapper");
      selectWrapper.forEach((select) => {
        select.addEventListener("click", function () {
          this.querySelector(".select").classList.toggle("open");
        });
      });

      window.addEventListener("click", function (e) {
        const selectAll = document.querySelectorAll(".select");

        for (const select of selectAll) {
          if (!select.contains(e.target)) {
            select.classList.remove("open");
          }
        }
      });
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });

    },
    imageUpload(e) {
      let name = e.target.name;
      let id = e.target.id;
      let index = id.split('-')[1];
      this.errors[index].passport_attachment = false;
      let types = ["image/png", "application/pdf", "image/jpeg"];
      let file = e.target.files[0];
      if (file == undefined) {
        return;
      }

      if (types.includes(file.type)) {
        let newBase64String = "";
        this.convertToBase64(file, (base64String) => {
          //newBase64String = base64String;
          this.passengers[index].passport_attachment = base64String;
        });
        this.passengers[index].passport_file_short_name = this.shortenText(file.name);
        if (file.size > (1024 * 1024)*2) {
            this.errors[index].passport_attachment = "Image size should be less than 2 MB!";
          }
      } else {
        this.errors[index].passport_attachment = "File not supported!";
      }
    },
    convertToBase64(file, callback) {
      const reader = new FileReader();
      reader.onload = function (event) {
        // Execute the callback function with the Base64 string as an argument
        callback(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    shortenText(text) {
      if (text.length <= 30) { // If the text is already short enough, return it as is
        return text;
      } else {
        const shortenedText = text.slice(0, 13) + ' .......... ' + text.slice(-10); // Add the dot in the middle
        return shortenedText;
      }
    },
  },
};
</script>