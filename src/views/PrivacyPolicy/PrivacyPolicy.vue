<template>
  <person-layout>
    <template v-slot:sidebar>
      <sidebar-privacy></sidebar-privacy>
    </template>
    <template v-slot:sub_navbar>
      <nav-feature>
        <div class="px-2 uppercase font-medium">
          Chính sách bảo mật
        </div></nav-feature
      ></template
    >
    <Transition name="slide-fade">
      <div
        class="home w-full h-full py-2 px-4 text-left text-base"
        v-if="isLoading == false"
      >
        <pre
          class=""
          style="
            font-family: Roboto sans-serif;
            white-space: pre-wrap; /* Since CSS 2.1 */
            white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
            white-space: -pre-wrap; /* Opera 4-6 */
            white-space: -o-pre-wrap; /* Opera 7 */
            word-wrap: break-word;
            line-height: 1.6;
          "
        >
<span class="font-semibold">Privacy Policy</span>
BTP Holdings built the HRM System as a Free app for internal company. This SERVICE is provided by BTP Holdings at no cost and is intended for use as is.
This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.
If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.
The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at HRM System - BTP Holdings unless otherwise defined in this Privacy Policy.
<span class="font-semibold">Acknowledgment & User Generated Content </span>
Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
•	You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
•	You must be an employee of BTP Holdings, or a partner authorized to access the application
•	All data that you provide (attach, upload) while using the service is stored and used by the company.
•	You agree to allow all permissions of the application to access your data such as: location, camera, media store...
•	You will be fully responsible before the law for violations caused by you such as: Propagating depraved cultural products, uploading sensitive images and videos or having a bad influence on the community.
<span class="font-semibold">Information Collection and Use</span>
For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information that we request will be retained by us and used as described in this privacy policy.
The app does use third-party services that may collect information used to identify you.
Link to the privacy policy of third-party service providers used by the app
•	<a href="https://policies.google.com/privacy" class="text-blue-500 underline">Google Play Services</a> 
•	<a href="https://support.google.com/admob/answer/6128543?hl=en" class="text-blue-500 underline">AdMob</a> 
•	<a href="https://firebase.google.com/policies/analytics" class="text-blue-500 underline">Google Analytics for Firebase</a> 
•	<a href="https://firebase.google.com/support/privacy/" class="text-blue-500 underline">Firebase Crashlytics</a> 
<span class="font-semibold">Log Data</span> 
We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
<span class="font-semibold">Cookies</span> 
Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.
This Service does not use these “cookies” explicitly. However, the app may use third-party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.
<span class="font-semibold">Service Providers</span>
We may employ third-party companies and individuals due to the following reasons:
•	To facilitate our Service;
•	To provide the Service on our behalf;
•	To perform Service-related services; or
•	To assist us in analyzing how our Service is used.
We want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
<span class="font-semibold">Security</span>
We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
<span class="font-semibold">Links to Other Sites</span> 
This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
<span class="font-semibold">Children’s Privacy</span> 
These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13 years of age. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do the necessary actions.
<span class="font-semibold">Changes to This Privacy Policy</span> 
We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.
This policy is effective as of 2023-02-14
<span class="font-semibold">Contact Us</span> 
If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at admin@btpholdings.vn. 
      </pre>
      </div>
    </Transition>
  </person-layout>
  <loading-overlay :isLoading="isLoading"> </loading-overlay>
</template>

<script>
import NavFeature from "@/components/navbar/NavFeature.vue";
import PersonLayout from "@/layouts/person-layout.vue";
import SidebarPrivacy from "@/components/sidebar/SidebarPrivacy.vue";
import { ref } from "@vue/runtime-core";
export default {
  components: {
    PersonLayout,
    SidebarPrivacy,
    NavFeature,
  },
  setup() {
    const isLoading = ref(true);
    setTimeout(() => {
      isLoading.value = false;
    }, 500);

    return {
      isLoading,
    };
  },
};
</script>

<style></style>
