<template>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Trip Satisfy</title>
        <link rel="shortcut icon" href="assets/images/bimanlogo.svg" type="image/svg+xml">

        <style>
            @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap');

            :root {
                --primaryfont: 'Nunito', sans-serif;
                --tableborder: #eeeeee;
                --textcolor: #444;
                --textgray: #777;
            }

            html {
                box-sizing: border-box;
            }

            *,
            *::before,
            *::after {
                box-sizing: inherit;
                margin: 0;
            }


            table thead tr th .logo {
                width: 8.1875rem;
                height: 2.1875rem;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }

            table thead tr th .logo img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }

            body {
                color: black;
                font-family: var(--primaryfont);
                font-size: .875rem;
                font-weight: 400;
                line-height: 1.5;
                margin: 0;
                page-break-inside: avoid;
            }

            .pdfcontainer {
                width: 21cm;
                min-height: 100vh;
                margin: 0 auto;
                background-color: white;
            }

            table {
                width: 100%;
                flex-direction: column;
                gap: .5rem;
            }

            thead tr {
                border-bottom: solid .0625rem var(--tableborder);
                padding-bottom: .5rem;
                page-break-inside: avoid;
            }

            table tr,
            td {
                width: 100%;
                page-break-inside: avoid;
            }

            .detail {
                text-align: left;
                margin-left: auto;
                width: 12.5rem;
            }

            .text {
                color: var(--textcolor);
                font-weight: 700;
                font-size: .8125rem;
            }

            .passangers {
                display: flex;
                flex-direction: column;
                gap: .25rem;
            }

            .passangers span,
            .passangers strong {
                font-size: 1rem;
            }

            .passangers span {
                color: var(--textgray);
            }

            .passangers strong {
                color: var(--textcolor);
            }

            .bimaninfo {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1.5rem 0;
            }

            .bimaninfo .icon {
                width: 3rem;
                height: 3rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 100%;
                overflow: hidden;
            }

            .bimaninfo .icon img {
                width: 100%;
                object-fit: cover;
            }

            .bimaninfo .descript .name {
                color: var(--textcolor);
                font-size: 1rem;
            }

            .bimaninfo .descript .bimantext {
                color: var(--textgray);
            }

            .flightinfo {
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }

            .leftinfo,
            .centerinfo,
            .rightinfo {
                display: flex;
                flex-direction: column;
                color: var(--textgray);
                font-weight: 600;
            }

            .centerinfo {
                min-width: 10rem;
                text-align: center;
            }

            .arricon {
                /* width: 10rem; */
                height: 1.25rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }


            .tablerow {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border: solid .0625rem var(--tableborder);
                margin-bottom: .75rem;
                padding: .75rem 1rem;
                border-radius: .625rem;
            }

            .infos {
                display: flex;
                align-items: center;
                gap: .25rem;
            }

            .rightinfos {
                justify-content: flex-end;
            }

            .tableinfo {
                display: flex;
                flex-direction: column;
            }

            .tablerightinfo {
                max-width: 70%;
                margin-left: auto;
            }

            .tablerow strong {
                font-size: 1rem;
                color: var(--textcolor);
            }
            .page-break {
                    page-break-before:always;
            }
            @media print {

                body,
                table,
                tr,
                td {
                    page-break-inside: avoid;
                }
            }
        </style>

    </head>

    <body>
        <button class="download-btn" @click="htmlToPdf">Download Ticket</button>
        <div style="display: none;">
            <div id="pdf-area" class="pdfcontainer" style="padding: 20px;font-size: 80% !important;">
                <div class="ticket" v-for="(ticket, index) of ticketData?.ticket" :key="index" style="width: 100%;" :class="[index>0 ? 'page-break' : '']">
                    <table aria-describedby="table" id="my-table">
                        <thead>
                            <tr style="display: flex; align-items: center; justify-content: space-between;">
                                <th>
                                    <div class="logo" style="width: 135px;">
                                        <img src="/assets/images/logo/logo.png" alt="logo" width="131px" style="width: 131px;">
                                    </div>
                                </th>
        
                                <th>
                                    <div class="detail">
                                        <p class="text" v-html="address"></p>
                                    </div>
                                </th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="2"> 
                                    <span> Airline Pnr: {{ ticketData?.booking?.pnr }} </span>
                                    <table aria-describedby="table"  v-for="(coupon, couponIndex) of ticket?.tickets[0]?.coupons" :key="couponIndex">
                        <tbody>
                            <tr style="display: flex; align-items: center; justify-content: space-between;">
                                <td>
                                    <div class="passangers">
                                        <span>Passangers</span>
                                        <strong>{{ ticket.passengers[0]?.lastName }} {{titleSplit(ticket.passengers[0]?.firstName) }}</strong>
                                    </div>
                                </td>
                                <td>
                                    <div class="passangers" style="text-align: right;">
                                        <span>Ticket / Coupon</span>
                                        <strong>{{ coupon.ticketNumber }} / {{ coupon.couponNumber }}</strong>
                                    </div>
                                </td>
                            </tr>
        
                            <tr style="display: flex; align-items: center; justify-content: space-between;">
                                <td>
                                    <div class="bimaninfo">
                                        <figure class="icon">
                                            <img :src="airlineLogo(coupon.airline)" @error="imageUrlAlt" />
                                        </figure>
        
                                        <div class="descript">
                                            <h5 class="name"> {{ airlineName(coupon.airline + "") }}</h5>
                                            <p class="bimantext">Flight Num: {{ coupon.flightNumber }}</p>
                                        </div>
                                    </div>
                                </td>
        
                                <td>
                                    <div class="flightinfo">
                                        <div class="leftinfo">
                                            <span>{{ coupon.from }}</span>
                                            <span>{{$moment(coupon?.departure).format("HH:mm")}}</span>
                                        </div>
        
                                        <div class="centerinfo">
                                            <span style="padding-bottom: 5px;">Non Stop</span>
                                            <span class="arricon">
                                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
                                                    clip-rule="evenodd">
                                                    <path
                                                        d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                                                </svg>
                                            </span>
                                            <span>{{ totalFlightTime(coupon?.departure, ticketData?.booking?.segments[couponIndex]?.arrival) }}</span>
                                        </div>
        
                                        <div class="rightinfo">
                                            <span>{{ coupon.to }}</span>
                                            <span>{{ $moment(ticketData?.booking?.segments[couponIndex]?.arrival).format("HH:mm") }}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
        
                            <tr class="tablerow">
                                <td>
                                    <div class="infos">
                                        <span>Departure:</span>
                                        <strong>{{ $moment(coupon?.departure).format("DD-MM-YY HH: mm") }}</strong>
                                    </div>
                                </td>
                                <td>
                                    <div class="infos rightinfos">
                                        <span>Arrival:</span>
                                        <strong>{{ $moment(ticketData?.booking?.segments[couponIndex]?.arrival).format("DD-MM-YY HH: mm") }}</strong>
                                    </div>
                                </td>
                            </tr>
        
                            <tr class="tablerow">
                                <td>
                                    <div class="infos">
                                        <span>From:</span>
                                        <strong>{{ coupon.from }}</strong>
                                    </div>
                                </td>
                                <td>
                                    <div class="infos rightinfos">
                                        <span>To:</span>
                                        <strong>{{ coupon.to }}</strong>
                                    </div>
                                </td>
                            </tr>
        
                            <tr class="tablerow">
                                <td>
                                    <div class="tableinfo">
                                        <span>Airport:</span>
                                        <strong>{{ airportName(coupon.from) }}</strong>
                                    </div>
                                </td>
                                <td>
                                    <div class="tableinfo tablerightinfo">
                                        <span>Airport:</span>
                                        <strong>{{ airportName(coupon.to) }}</strong>
                                    </div>
                                </td>
                            </tr>
        
                            <tr class="tablerow">
                                <td>
                                    <div class="infos">
                                        <span>Cabin:</span>
                                        <strong>{{ ticketData?.booking?.segments[couponIndex]?.serviceClass }}</strong>
                                    </div>
                                </td>
                                <td>
                                    <div class="infos rightinfos">
                                        <span>Flight Info:</span>
                                        <strong>{{ coupon.airline }} {{ coupon.flightNumber }} {{ ticketData?.booking?.segments[couponIndex]?.plane.join("-") }}</strong>
                                    </div>
                                </td>
                            </tr>
                            <tr class="tablerow">
                                <td>
                                    <div class="infos">
                                        <span>Baggage Allowance:</span>
                                        <strong> {{ baggage(coupon.fareBasisCode,couponIndex).amount }} {{ baggage(coupon.fareBasisCode,couponIndex).units }}</strong>
                                    </div>
                                </td>
                                <td>
                                    <div class="infos rightinfos">
                                        <span>Carry-on:</span>
                                        <strong> 7 Kilograms </strong>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                                 </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>
    </body>

    </html>
</template>

<script>
import html2pdf from 'html2pdf.js'

export default {
    name: "MyTicketPdf",
    props:['ticketData'],
    data() {
        return {

        }
    },
    computed: {
        appName() {
            return process.env.APP_NAME || "";
        },
        address() {
            return process.env.address || "";
        },
    },
    methods:{
        htmlToPdf() {
            const element = document.getElementById('pdf-area');
            const options = {
                filename: `ETicket-${this.ticketData?.booking?.pnr }.pdf`,
                image: { type: 'png', quality: 0.8 },
                html2canvas: { scale: 2, useCORS: true, dpi: 192, letterRendering: true },
                jsPDF: { unit: 'px', format: 'a4', orientation: 'portrait', hotfixes: ['px_scaling'] },
                margin: [10, 10, 10, 10],
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
                imageProperties: { useCors: true },
                imageTimeout: 0,
                useCORS: true,
                output: 'dataurlnewwindow'
            }
            html2pdf().set(options).from(element).save()
        },
        titleSplit(string){
            // Regular expression pattern to match the four strings: Mr, Mrs, Ms, MD
            const pattern = /(Mr|Mrs|Ms|MD)$/;

            // Check if the last 2 or 3 characters match the pattern
            const match = string.match(pattern);

            if (match) {
                // Add a space before the matched string
                string = string.replace(pattern, ` ${match[0]}`);
            }
            return string;
        
        },
        imageUrlAlt(event) {
            event.target.src =
                "https://thefinancialexpress.com.bd/public/uploads/1578301226.jpg";
        },
        airlineLogo(code) {
            return `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${code}.png`;
        },
        airlineName(inputValue, key = "iata") {
            const objectData = require("../../static/utils/airlines_codes.json");
            const input = inputValue.toString().toLowerCase();
            const result = objectData.find((data) => {
                return (
                    (data[key] !== undefined && data[key] !== null && data[key])
                        .toLowerCase()
                        .trim() == input
                );
            });
            return result?.airline || inputValue;
        },
        airportName(inputValue, key = "code") {
            const objectData = require("../../static/utils/airport_codes.json");
            const input = inputValue.toString().toLowerCase();
            const result = objectData.find((data) => {
                return (
                    (data[key] !== undefined && data[key] !== null && data[key])
                        .toLowerCase()
                        .trim() == input
                );
            });
            return result?.airport || inputValue;
        },
        totalFlightTime(firstTime, lastTime) {
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
        baggage(fareBasisCode,couponIndex){
            let pricingInfos = this.ticketData?.booking?.fareQuotes[0]?.pricingInfos;
            let infoIndex;
            for(infoIndex in pricingInfos){
                let fareCalculation = pricingInfos[infoIndex].fareCalculation;
                if (fareCalculation.includes(fareBasisCode)) {
                    return pricingInfos[infoIndex].baggage[couponIndex];
                }
            }
        },
    }
}
</script>

<style></style>