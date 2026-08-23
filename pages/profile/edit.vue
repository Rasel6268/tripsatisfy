<template>
  <!-- ================ MY ACCOUND START============= -->
  <section class="myaccount">
    <div class="go-container">
      <form @submit.prevent="submitWithValidation" enctype="multipart/form-data">
        <div class="myaccount-content">

          <aside class="profile-sidebar">
            <div class="profile-sidebar-content">
              <div class="profile-sidebar-header">
                <figure class="profile-thumb">
                  <input type="file" name="image" id="uploadImage" hidden="" @change="imageUpload">
                  <label for="uploadImage" class="uploadLabel">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="feather feather-upload-cloud">
                      <polyline points="16 16 12 12 8 16"></polyline>
                      <line x1="12" y1="12" x2="12" y2="21"></line>
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                      <polyline points="16 16 12 12 8 16"></polyline>
                    </svg>
                  </label>
                  <img :src="errors.image ? defaultUserImg : (userImage() || defaultUserImg)" id="image-preview"
                    alt="profile image ">
                </figure>
                <p v-if="errors.image" class="text-danger">
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
                    {{ errors.image }}
                  </small>
                </p>
                <h2 class="user-name" v-if="userData.user?.first_name">{{ userData.user?.first_name }}
                  {{ userData.user?.last_name }}</h2>
                <p class="user-email"> {{ userData.user?.email }} </p>
              </div>
              <div class="profile-sidebar-body">
                <ul class="menulist">
                  <li :class="['menulist-item', currentRoute == '/profile' && 'active']">
                    <span>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="8" fill="#F6F0FE" />
                      </svg>
                    </span>
                    <nuxt-link to="/profile" class="menulist-link">My Profile</nuxt-link>
                  </li>
                  <li :class="['menulist-item', currentRoute == '/booking' && 'active']">
                    <span>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="8" fill="#F6F0FE" />
                      </svg>
                    </span>
                    <nuxt-link to="/booking" class="menulist-link">My Booking</nuxt-link>
                  </li>
                  <li :class="[
                    'menulist-item',
                    currentRoute == '/mybalance' && 'active',
                  ]" v-if="userData.customer_type == 'B2B'">
                    <span>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="8" fill="#F6F0FE" />
                      </svg>
                    </span>
                    <nuxt-link to="/mybalance" class="menulist-link">My Balance </nuxt-link>
                  </li>
                  <li :class="[
                    'menulist-item',
                    currentRoute == '/profile/password' && 'active',
                  ]">
                    <span>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="8" fill="#F6F0FE" />
                      </svg>
                    </span>
                    <nuxt-link to="/profile/password" class="menulist-link"><span v-if="userData.has_usable_password">Change</span> <span v-else>Set</span> Password</nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          <div class="profile-content">
            <div class="guestinfo-card">
              <div class="guestinfo-card-body">
                <div class="row" v-if="userInfo?.user">

                  <div class="col-lg-12">
                    <div class="row g-4">
                      <!-- title -->
                      <div class="col-lg-2">
                        <div class="input-box-2">
                          <div class="input-box2">
                            <label for="guest1" class="input-label">Title</label>
                            <div class="select-wrapper">
                              <div class="select">
                                <div class="select-trigger">
                                  <span class="selectedvalue">{{
                                    userInfo.title
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
                                        userInfo.title == 'Mr' && 'selected',
                                      ]" @click="userInfo.title = 'Mr'">Mr</span>
                                  <span :class="[
                                    'custom-option',
                                    userInfo.title == 'Mrs' && 'selected',
                                  ]" @click="userInfo.title = 'Mrs'">Mrs</span>
                                  <span :class="[
                                    'custom-option',
                                    userInfo.title == 'Ms' && 'selected',
                                  ]" @click="userInfo.title = 'Ms'">Ms</span>
                                  <span :class="[
                                    'custom-option',
                                    userInfo.title == 'MD' && 'selected',
                                  ]" @click="userInfo.title = 'MD'">MD</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- first name -->
                      <div class="col-lg-5">
                        <div class="input-box2">
                          <label for="first_name" class="input-label">Firtst Name <span class="text-danger">*</span> :
                          </label>
                          <input type="text" name="user.first_name" v-model="userInfo.user.first_name" id="first_name"
                            class="input-field" placeholder="First Name" @keyup="errors.first_name = false" />
                        </div>
                        <span class="text-danger small-text" v-if="errors.first_name">
                          First Name can not be null!
                        </span>
                      </div>
                      <!-- Last name -->
                      <div class="col-lg-5">
                        <div class="input-box2">
                          <label for="sur_name" class="input-label">Surname <span class="text-danger">*</span> :</label>
                          <input type="text" v-model="userInfo.user.last_name" id="sur_name" class="input-field"
                            placeholder="Surname" @keyup="errors.last_name = false" />
                        </div>
                        <span class="text-danger small-text" v-if="errors.last_name">
                          Surname can not be null!
                        </span>
                      </div>
                      <!-- gender -->
                      <div class="col-lg-6">
                        <div class="input-box2">
                          <label for="gender" class="input-label">Gender <span class="text-danger">*</span> :</label>
                          <!-- trip radio buttons -->
                          <div class="trip-radios">
                            <div class="customradio">
                              <input type="radio" id="male" class="customradio-box" name="gender"
                                v-model="userInfo.gender" value="Male" hidden @click="errors.gender = false" />
                              <label for="male" class="customradio-label">Male</label>
                            </div>
                            <div class="customradio">
                              <input type="radio" id="female" class="customradio-box" name="gender"
                                v-model="userInfo.gender" value="Female" @click="errors.gender = false" hidden />
                              <label for="female" class="customradio-label">Female</label>
                            </div>
                          </div>
                        </div>
                        <span class="text-danger small-text" v-if="errors.gender">
                          Gender can not be null!
                        </span>
                      </div>
                      <!-- date of birth  -->
                      <div class="col-lg-6">
                        <div class="input-box2">
                          <label for="dateofbirth" class="input-label">Date Of Birth <span class="text-danger">*</span> :
                          </label>
                          <date-picker id="dateofbirth" class="input-field fullWidth" placeholder="DD/MM/YYYY"
                            format="dd/MM/yyyy" v-model="userInfo.birthdate" @selected="errors.birthdate = false" />
                        </div>
                        <span class="text-danger small-text" v-if="errors.birthdate">
                          Birthdate can not be null!
                        </span>
                      </div>
                      <!-- Nationality -->

                      <div class="col-lg-6">
                        <div class="input-box2">
                          <label for="guest1" class="input-label">
                            Nationality <span class="text-danger">*</span> :
                          </label>
                          <!-- custom select -->
                          <div class="select-wrapper">
                            <div class="select">
                              <div class="select-trigger">
                                <span class="selectedvalue">
                                  {{
                                    userInfo.nationality ||
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
                                <span v-for="nation of nationalities" :class="[
                                  'custom-option',
                                  userInfo.nationality == nation.name &&
                                  'selected',
                                ]" :key="nation.id" @click="setNationality(nation)">
                                  {{ nation.name }}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <span class="text-danger small-text" v-if="errors.nationality">
                          Nationality can not be null!
                        </span>
                      </div>
                      <!-- Post Code  -->
                      <div class="col-lg-6">
                        <div class="input-box2">
                          <label for="post" class="input-label">Post Code <span class="text-danger">*</span> :
                          </label>
                          <input type="text" v-model="userInfo.post_code" id="post" class="input-field"
                            placeholder="Post Code" @keyup="errors.post_code = false" />
                        </div>
                        <span class="text-danger small-text" v-if="errors.post_code">
                          Post Code can not be null!
                        </span>
                      </div>

                      <!-- address -->
                      <div class="col-12">
                        <div class="input-box2">
                          <label for="address" class="input-label">Address <span class="text-danger">*</span> :</label>
                          <input type="text" v-model="userInfo.address" id="address" class="input-field"
                            placeholder="Your Address" @keyup="errors.address = false" />
                        </div>
                        <span class="text-danger small-text" v-if="errors.address">
                          Address can not be null!
                        </span>
                      </div>
                      <!-- Mobile No -->
                      <div class="col-lg-6">
                        <div class="input-box2">
                          <label for="Mobile_number" class="input-label">Mobile Number <span class="text-danger">*</span> :</label>
                          <input type="number" v-model="userInfo.phone_number" id="Mobile_number" class="input-field"
                            placeholder="Your Mobile Number" @keyup="errors.phone_number = false" />
                        </div>
                        <span class="text-danger small-text" v-if="errors.phone_number">
                          Mobile Number can not be null!
                        </span>
                      </div>
                      <!-- Email  -->
                      <div class="col-lg-6">
                        <div class="input-box2">
                          <label for="email" class="input-label">Email <span class="text-danger">*</span> :</label>
                          <input type="email" v-model="userInfo.user.email" id="email" class="input-field"
                            placeholder="Email" @keyup="errors.email = false" />
                        </div>
                        <span class="text-danger small-text" v-if="errors.email">
                          {{ errors.email }}
                        </span>
                      </div>

                      <!-- Pusport Number  -->
                      <div class="col-lg-6">
                        <div class="input-box2">
                          <label for="passport-no" class="input-label">Passport Number</label>
                          <input type="text" v-model="userInfo.passport_number" id="passport-no" class="input-field"
                            placeholder="Passport Number" />
                        </div>
                      </div>
                      <!-- Pusport Expire date  -->
                      <div class="col-lg-6">
                        <div class="input-box2">
                          <label for="exp-date" class="input-label">Passport Expiry Date</label>
                          <date-picker id="exp-date" class="input-field fullWidth" placeholder="DD/MM/YYYY"
                            format="dd/MM/yyyy" v-model="userInfo.passport_expiry_date" />
                        </div>
                      </div>

                      <!-- Passport -->
                      <div class="col-lg-6">
                        <div class="input-box2">
                          <p class="input-label">Passport Copy (max 2 MB)</p>
                          <input type="file" name="passport" id="passport" class="input-field" placeholder="passport"
                            hidden @change="imageUpload" />
                          <label for="passport" class="upload-box">
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
                          <p v-if="images.passport?.name && !errors.passport" class="text-success"
                            :title="images.passport?.name">
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
                              {{ images.passport?.short_name }}
                            </small>
                          </p>
                          <p v-if="errors.passport" class="text-danger">
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
                              {{ errors.passport }}
                            </small>
                          </p>
                          <p v-if="userInfo.passport">
                            <small>
                              <a :href="userInfo.passport" target="_blank">
                                <span>
                                  <svg width="16" height="14" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor">
                                    <path
                                      d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                                  </svg>
                                </span>
                                Passport Copy
                              </a>
                            </small>
                          </p>
                        </div>
                      </div>

                      <!-- VISA-->
                      <div class="col-lg-6">
                        <div class="input-box2">
                          <p class="input-label">Visa Copy (max 2 MB)</p>
                          <input type="file" name="visa" id="visa" class="input-field" placeholder="visa" hidden
                            @change="imageUpload" />
                          <label for="visa" class="upload-box">
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
                          <p v-if="images.visa?.name && !errors.visa" class="text-success" :title="images.visa?.name">
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
                              {{ images.visa?.short_name }}
                            </small>
                          </p>
                          <p v-if="errors.visa" class="text-danger">
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
                              {{ errors.visa }}
                            </small>
                          </p>
                          <p v-if="userInfo.visa">
                            <small>
                              <a :href="userInfo.visa" target="_blank">
                                <span>
                                  <svg width="16" height="14" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor">
                                    <path
                                      d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                                  </svg>
                                </span>
                                Visa Copy
                              </a>
                            </small>
                          </p>
                        </div>
                      </div>
                      <div class="col-12 text-end">
                        <p v-if="errors.common" class="text-danger small-text text-left"> {{ errors.common }} </p>
                        <div class="button-wrapper">
                          <button class="save-btn" type="submit">save</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
  <!-- ============= MY ACCOUND  END================ -->
</template>
  
<script>
export default {
  middleware: "auth",
  name: "Profile",
  data() {
    return {
      nationalities: [],
      userInfo: {
        title: "",
        user: {
          first_name: "",
          last_name: "",
          email: "",
        },
      },
      images: {
        passport: "",
        visa: "",
      },
      requiredFiled: [
        "title",
        "gender",
        "birthdate",
        "nationality",
        "post_code",
        "address",
        "phone_number",
      ],
      errors: {
        first_name: false,
        last_name: false,
        email: false,
        passport: false,
        visa: false,
        image: false,
        postal_code: false,
        gender: false,
        common: false
      },
      defaultUserImg: '/assets/images/user.svg',
      isSubmit: true,
    };
  },
  mounted() {
    this.rawJsSelect();
    this.getUser();
    this.getNationality();
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    },
    userData() {
      console.log(this.$store.state.userInfo)
      return {
        ...this.$store.state.userInfo,
        user: {
          id: this.$store.state.userInfo.user?.id,
          email: this.$store.state.userInfo.user?.email,
          first_name: this.$store.state.userInfo.user?.first_name,
          last_name: this.$store.state.userInfo.user?.last_name,
          username: this.$store.state.userInfo.user?.username,
        },
      };
    },
  },
  watch: {
    userData() {
      this.getUser();
    },
  },
  methods: {
    userImage() {
      if (this.userData.social_id != null && this.userData.image == null) {
        return this.userData.social_img;
      }
      return this.userData.image;
    },
    submitWithValidation() {
      this.isSubmit = true;
      // user info field validation
      this.requiredFiled.forEach((field) => {
        if (this.userInfo[field] == null || this.userInfo[field] == "") {
          this.errors[field] = true;
          this.isSubmit = false;
        }
      });
      // User field validation
      let userFields = ["first_name", "last_name", "email"];
      userFields.forEach((field) => {
        if (
          this.userInfo.user[field] == null ||
          this.userInfo.user[field] == ""
        ) {
          this.errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)
            } can not be null`;
          this.isSubmit = false;
        }
      });
      if (this.isSubmit) {
        if (
          this.userInfo.passport_expiry_date != null &&
          this.userInfo.passport_expiry_date != ""
        ) {
          this.userInfo.passport_expiry_date = this.$moment(
            this.userInfo.passport_expiry_date,
            "YYYY-MM-DD"
          ).format("YYYY-MM-DD");
        } else {
          delete this.userInfo.passport_expiry_date;
        }
        this.userInfo.birthdate = this.$moment(
          this.userInfo.birthdate,
          "YYYY-MM-DD"
        ).format("YYYY-MM-DD");
        this.userInfo.user.username = this.userInfo.user.email;

        let formData = new FormData();
        // Delete some propertise which can make conflict of file upload
        delete this.userInfo.image;
        delete this.userInfo.passport;
        delete this.userInfo.visa;
        // Append to formData from local storage
        for (let key in this.userInfo) {
          if (this.userInfo[key] instanceof Object) {
            for (let innerKey in this.userInfo[key]) {
              if (innerKey !== "id") {
                formData.append(`${innerKey}`, this.userInfo[key][innerKey]);
              }
            }
          } else {
            formData.append(`${key}`, this.userInfo[key]);
          }
        }
        if (!this.errors.passport && this.images.passport) {
          formData.append("passport", this.images.passport);
        }
        if (!this.errors.visa && this.images.visa) {
          formData.append("visa", this.images.visa);
        }
        if (!this.errors.image && this.images.image) {
          formData.append("image", this.images.image);
        }
        // update to db

        this.$axios
          .post(`/customer-profile-update`, formData, header)
          .then((res) => {
            let isDone = true;
            if (res.data.passport && Array.isArray(res.data.passport)) {
              this.errors.passport = res.data.passport[0];
              isDone = false;
            }
            if (res.data.visa && Array.isArray(res.data.visa)) {
              this.errors.visa = res.data.visa[0];
              isDone = false;
            }
            if (res.data.username) {
              this.errors.email = res.data.username[0];
              isDone = false;
            }
            if (isDone) {
              this.images.passport = '';
              this.images.visa = '';
              this.$store.dispatch("userInfo");
              this.$toast.success("Successfully Updated.");
              this.errors.common = false;
            }
          })
          .catch((err) => {
            this.$elog(err.response);
            this.$elog(err.response.status);
            if (err.response?.status && err.response?.status == 413) {
              this.errors.common = 'Your file is too large.';
              this.$toast.error("Your file is too large.");
            } else {
              this.$toast.error("Error found!");
            }
          });
      }
    },
    imageUpload(e) {
      let name = e.target.name;
      this.errors[name] = false;
      let types = ["image/png", "application/pdf", "image/jpeg"];
      let file = e.target.files[0];
      if (file == undefined) {
        return;
      }
      if (name == "image") {
        types.splice(1, 1)
      }
      if (types.includes(file.type)) {

        this.images[name] = file;
        this.images[name].short_name = this.shortenText(file.name);
        if (name == "image") {
          if (file.size > 1024 * 1024) {
            this.errors[name] = "Image size should be less than 1 MB!";
          } else {
            this.imagePreview(e);
          }
        }
      } else {
        if (name == "image") {
          let imageView = document.getElementById("image-preview");
          imageView.src = this.defaultUserImg
        }
        this.errors[name] = "File not supported!";
      }
    },
    imagePreview(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      let imageView = document.getElementById("image-preview");
      reader.addEventListener("load", function () {
        imageView.src = reader.result;
      });
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    shortenText(text) {
      if (text.length <= 30) { // If the text is already short enough, return it as is
        return text;
      } else {
        const shortenedText = text.slice(0, 13) + ' .......... ' + text.slice(-10); // Add the dot in the middle
        return shortenedText;
      }
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
    setNationality(nation) {
      this.userInfo.nationality = nation.name;
      this.errors.nationality = false;
      this.$log(this.userInfo);
    },
    getUser() {
      this.userInfo = { ...this.userData };
      if (this.userInfo.title == null) {
        this.userInfo.title = "Mr";
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
    },
  },
};
</script>
  
<style></style>