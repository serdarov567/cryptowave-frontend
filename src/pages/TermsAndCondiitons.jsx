import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import Navbar from "src/components/Navbar";

const TermsAndConditions = () => {
  return (
    <Box pos={"relative"} width={"100vw"} h={"100vh"}>
      <Navbar />
      <Container maxW={"container.xl"}>
        <Flex
          flexDir={"column"}
          paddingY={useBreakpointValue({ base: "100px", md: "150px" })}
        >
          <Heading marginBottom={"20px"}>Terms and Conditions</Heading>
          <Text
            fontFamily={"Manrope-Bold"}
            paddingX={useBreakpointValue({ base: "20px", md: "100px" })}
            textAlign={"justify"}
            whiteSpace={"break-spaces"}
            bgColor={"background.200"}
            paddingY={"50px"}
            borderRadius={"10px"}
            marginBottom={"50px"}
          >
            <p>General Rules</p>
            <br />
            This document is created in accordance with the rules of
            international law and business practice.
            <br />
            CryptoWave Limited accepts individuals aged 18.
            <br />
            The registration procedure is necessary for each CryptoWave Limited
            client.
            <br />
            You agree with terms and conditions by being a client of CryptoWave
            Limited.
            <br />
            Investment Rules
            <br />
            Every deposit is considered to be a private transaction between
            CryptoWave Limited and its client.
            <br />
            Clients process all financial transactions solely at their own
            discretion and their own risk. The size and term of deposit is
            determined personally by each client.
            <br />
            Accrual of interest on the investment is calculated and credited to
            client's account at the end of investment term for &quot;AFTER&quot;
            investment plans and daily on 'DAILY' investment plans.
            <br />
            The principal is included in profit in 'AFTER' investment plans and
            not included (will be returned after the deposit expiration) on
            'DAILY' investment plans.
            <br />
            The interest rate depends on the amount of investment, investment
            plan and deposit term.
            <br />
            Client can use our Profit Calculator for an accurate calculation of
            his/her profit.
            <br />
            Client may choose any payment system or cryptocurrency that we
            accept in order to make a deposit. CryptoWave Limited accepts only
            USD for investing.
            <br />
            Client can open only one account per IP/Family/Device. If you wish
            to open another account contact us before at
            support@cryptowaveclub.com. If a new account is opened, the old
            account will be closed.
            <br />
            Anti-Spam Rules
            <br />
            Spam is commercial e-mail or unsolicited bulk e-mail, including
            &quot;junk mail&quot;, which has not been requested by the
            recipient. It is intrusive and often irrelevant or offensive, and it
            wastes valuable resources. Inappropriate newsgroup activities,
            consisting of excessive posting of the same materials to several
            newsgroups, are also deemed to be spam. We don't tolerate SPAM in
            our company.
            <br />
            We forbid unsolicited e-mails of any kind in connection with the
            marketing of the services provided by CryptoWave Limited.
            <br />
            If any law enforcement agency, internet provider, web hosting
            provider or other person or entity provide us with notice that you
            may have engaged in transmission of unsolicited e-mails or may have
            engaged in otherwise unlawful conduct or conduct in violation of an
            internet service provider's terms of service or any such policies or
            regulations, we will reserve the right to cooperate in any
            investigation relating to your activities including disclosure of
            your account information.
            <br />
            If you didn't receive a letter from CryptoWave Limited, please don't
            forget to check your Spam folder because some email services may
            mark our email as Spam.
            <br />
            Procedure of amending the present rules
            <br />
            Administration of CryptoWave Limited reserves the right to make
            changes to the current document without the consent of investors.
            <br />
            Administration of CryptoWave Limited will inform clients about
            changes by publishing notice on the site of the company.
            <br />
            Terms and Conditions changes come into force since the date of
            publishing information on the site, unless otherwise provided in the
            text.
            <br />
            Customer Service and Support
            <br />
            Every client has the right to get any additional information from
            our support service.
            <br />
            Client may contact our support service via our Support Form or
            another method which is convinient for him.
            <br />
            Client agrees to behave politely with our support service and follow
            the instructions to prevent anyone from potentially negative
            situation.
          </Text>
          <Heading marginBlock={"20px"}>Privacy policy</Heading>
          <Text
            fontFamily={"Manrope-Bold"}
            paddingX={useBreakpointValue({ base: "20px", md: "100px" })}
            textAlign={"justify"}
            whiteSpace={"break-spaces"}
            bgColor={"background.200"}
            paddingY={"50px"}
            borderRadius={"10px"}
            marginBottom={"50px"}
          >
            <p>
              CryptoWave Limited understands the importance of personal
              information of every client. Cooperating with CryptoWave Limited
              you can be sure in privacy of your personal information and in its
              protection by our staff. Our employees protect all collected data
              from any third party. We use a variety of technologies to reduce
              the risk of leaks of clients' personal data.
            </p>

            <p>Personal information includes such items as:</p>

            <p>
              Name and Surname of the Client.
              <br />
              Locations.
              <br />
              Personal account of electronic currency.
              <br />
              Login, email and password.
              <br />
              CryptoWave Limited collects your personal information only with
              your permission and confidence in the security of your personal
              information in our company. Terms &amp; Conditions of our company
              explain how your information is collected and used.
            </p>

            <p>
              Information that is automatically collected when you visiting our
              website:
            </p>

            <p>
              Your IP address.
              <br />
              Your Internet Provider.
              <br />
              Your location and country of residence.
              <br />
              Your browser and type of operating system.
              <br />
              This types of information are also the part of the personal
              information.
            </p>

            <p>
              DATA STORAGE
              <br />
              We collect and save data only in our company on our own data
              storage without any third party. Personal information is stored in
              accordance with the rules of storage and disposal.
            </p>

            <p>
              Customer information, whether public or private, will not be sold,
              exchanged, transferred, or given to any other company for any
              reason whatsoever, without the consent of the customer, other than
              for the express purpose of delivering the purchased product or
              service requested by the customer.
            </p>

            <p>
              For your safety and protection, your credit card information or
              payment account is not stored on our servers. Our payment gateway
              provider Perfect Money and Payeer keeps this information encrypted
              and secure on your behalf.
            </p>

            <p>
              The email address you provide for order processing, may be used to
              send you information and updates pertaining to your order, in
              addition to periodic company news, updates, and/or related product
              or service information, etc.
              <br />
            </p>
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default TermsAndConditions;
