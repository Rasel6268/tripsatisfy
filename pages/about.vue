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
                                <span class="breadcrumb-list-link active"> About us </span>
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
                    <h1 class="border-bottom pb-2 mb-2"> About us </h1>
                    <div class="page-description">
                        <p>Welcome to TripSatisfy, your ultimate destination for all your travel needs. We are dedicated to
                            providing you with
                            the best travel experiences, whether it's booking a flight, finding the perfect hotel, or
                            planning an
                            unforgettable holiday.</p>

                        <h2>Our Mission</h2>
                        <p>At TripSatisfy, our mission is to make travel planning easy, convenient, and enjoyable. We strive
                            to offer a
                            seamless booking experience, providing you with a wide range of options, competitive prices, and
                            personalized
                            services. We want to ensure that every journey you embark on is filled with satisfaction and
                            unforgettable
                            memories.</p>

                        <h2>What We Offer</h2>
                        <p>With TripSatisfy, you can search and book flights to destinations around the world. We work with
                            reputable
                            airlines to offer you competitive prices and flexible options. Our hotel search allows you to
                            find accommodations
                            that suit your preferences and budget, ensuring a comfortable stay wherever you go.</p>
                        <p>Looking for a complete travel package? Explore our holiday offerings, including pre-designed
                            itineraries and
                            customizable trips. From tropical getaways to cultural explorations, we have a variety of
                            options to cater to
                            your interests.</p>

                        <h2>Why Choose TripSatisfy</h2>
                        <p>There are several reasons why TripSatisfy stands out as your preferred travel companion:</p>
                        <ul>
                            <li>Extensive Selection: We offer a wide range of flight options, hotels, and holiday packages
                                to choose from,
                                ensuring that you find the perfect fit for your travel needs.</li>
                            <li>Competitive Prices: We strive to provide you with competitive prices and exclusive deals,
                                helping you make
                                the most of your travel budget.</li>
                            <li>User-Friendly Experience: Our website is designed to be user-friendly, making it easy for
                                you to navigate,
                                search, and book your travel arrangements.</li>
                            <li>Customer Support: We have a dedicated customer support team available to assist you with any
                                inquiries or
                                concerns you may have during your travel planning process.</li>
                            <li>Trust and Security: We prioritize the security of your personal information and adhere to
                                strict privacy
                                practices to ensure your data is protected.</li>
                        </ul>

                        <h2>Contact Us</h2>
                        <p>If you have any questions, feedback, or need assistance, our friendly customer support team is
                            here to help. Feel
                            free to reach out to us through our contact page or by using the provided contact information.
                        </p>
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
            title: "About us",
            meta: [
                {
                    hid: "Description",
                    name: "description",
                    content: "About page"
                }
            ]
        }
    },
}
</script>
<style></style>