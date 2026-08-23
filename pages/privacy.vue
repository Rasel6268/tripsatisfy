<template>
    <div>
        <!-- ============ BREADCRUMB START============ -->
        <section class="breadcrumb">
            <div class="go-container w-100">
                <div class="row">
                    <div class="col-12">
                        <ul class="breadcrumb-list">
                            <li class="breadcrumb-list-item">
                                <nuxt-link to="/" class="breadcrumb-list-link">Home</nuxt-link>
                            </li>
                            <li class="breadcrumb-list-item">
                                <span class="breadcrumb-list-link active"> Privacy Policy </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <!-- ============BREADCRUMB END============ -->
        <section class="blogdetail">
            <div class="go-container">
                <div class="page-content">
                    <h1 class="border-bottom pb-2 mb-2"> Privacy Policy </h1>
                    <div class="page-description">
                        <p>At TripSatisfy, we are committed to protecting your privacy and ensuring the security of your
                            personal information.
                            This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when
                            you visit our
                            website (<a href="https://tripsatisfy.com">tripsatisfy.com</a>) or use our services. Please read this policy carefully to
                            understand our practices
                            regarding your personal data and how we will treat it.</p>

                        <h2>1. Information We Collect</h2>
                        <h3>1.1 Personal Information</h3>
                        <p>When you use our website or book a flight, hotel, or holiday, we may collect personal information
                            such as your
                            name, email address, phone number, and payment details. We only collect the minimum amount of
                            information
                            necessary to fulfill your requests.</p>

                        <h3>1.2 Log Data</h3>
                        <p>We automatically receive and store certain information when you interact with our website. This
                            may include your
                            IP address, browser type, operating system, referring URLs, pages visited, and other similar
                            data. This
                            information is used to analyze trends, administer the site, track users' movements, and gather
                            demographic
                            information for aggregate use.</p>

                        <h3>1.3 Cookies and Similar Technologies</h3>
                        <p>We use cookies and similar technologies to enhance your experience on our website. These
                            technologies allow us to
                            collect information about your browsing activities and preferences. You have the option to
                            disable cookies
                            through your browser settings, but please note that some features of our website may not
                            function properly as a
                            result.</p>

                        <h2>2. Use of Information</h2>
                        <h3>2.1 Personal Information</h3>
                        <p>We use the personal information you provide to fulfill your bookings, communicate with you,
                            improve our services,
                            and customize your experience on our website. We may also use your information to send you
                            promotional offers,
                            updates, or other communications if you have opted to receive them. You can opt out of these
                            communications at
                            any time.</p>

                        <h3>2.2 Log Data and Cookies</h3>
                        <p>We use log data and cookies to analyze trends, track user activity, and gather demographic
                            information. This helps
                            us improve our website, tailor our offerings to user preferences, and provide a better overall
                            experience.</p>

                        <h2>3. Data Sharing and Disclosure</h2>
                        <h3>3.1 Service Providers</h3>
                        <p>We may share your personal information with trusted third-party service providers who assist us
                            in operating our
                            website, conducting our business, or providing services to you. These providers have access to
                            your information
                            only to perform specific tasks on our behalf and are obligated to keep it confidential.</p>

                        <h3>3.2 Legal Requirements</h3>
                        <p>We may disclose your personal information if required to do so by law or in response to valid
                            legal requests or
                            court orders.</p>

                        <h3>3.3 Business Transfers</h3>
                        <p>In the event of a merger, acquisition, or sale of our business assets, your personal information
                            may be transferred
                            as part of the transaction. We will notify you via email and/or prominent notice on our website
                            of any change in
                            ownership or use of your personal information.</p>

                        <h2>4. Data Security</h2>
                        <p>We take the security of your personal information seriously and have implemented reasonable
                            physical, technical, and
                            administrative safeguards to protect it against unauthorized access, use, disclosure,
                            alteration, or destruction.
                            However, please be aware that no method of transmission over the internet or electronic storage
                            is completely
                            secure, and we cannot guarantee absolute security.</p>

                        <h2>5. Children's Privacy</h2>
                        <p>Our services are not intended for individuals under the age of 18. We do not knowingly collect
                            personal information
                            from children. If you believe that we may have collected information from a child without
                            parental consent,
                            please contact us, and we will promptly delete the information.</p>

                        <h2>6. Changes to the Privacy Policy</h2>
                        <p>We reserve the right to update or modify this Privacy Policy at any time without prior notice. We
                            will post the
                            revised policy on our website with the updated date. Your continued use of our services after
                            any changes to this
                            policy constitutes your acceptance of the revised policy.</p>

                        <h2>7. Contact Us</h2>
                        <p>If you have any questions, concerns, or suggestions regarding our Privacy Policy, please contact
                            us.</p>
                    </div>
                </div>
            </div>
        </section>


    </div>
</template>

<script>

export default {
    head() {
        return {
            title: "Privacy",
            meta: [
                {
                    hid: "Description",
                    name: "description",
                    content: "Hello nux, this is about page"
                }
            ]
        }
    },
    methods: {

        async showMessageFromBackend() {
            this.$log("hi");

            try {
                const config = {
                    headers: {
                        Accept: "application/json"
                    }
                };
                const url = "/api/air/availability"
                const response = await this.$axios.get(url, config)
                this.$log(response.data)
            } catch (err) {
                this.$elog(err)
            }

        }
    }
}
</script>
<style></style>