import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";
import Swal from 'sweetalert2';
import { useState } from "react";
import axios from 'axios'; // Import Axios

export default function MyForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  const baseUrl = "http://localhost:8000";

  const sendEmail = async () => {
    setIsLoading(true); // Set loading to true when sending email
    let dataSend = {
      email: email,
      subject: subject,
      message: message,
    };

    try {
      const response = await axios.post(`${baseUrl}/email/sendEmail`, dataSend, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Email sent successfully!',
        });
        // Clear input fields
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error in sending email',
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error in sending email',
      });
    }

    setIsLoading(false); // Set loading to false after receiving response
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          E-Mail Service&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Heading>
          
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Receiver's Email Address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Subject</FormLabel>
              <Input
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                placeholder="Enter the subject here..."
                value={subject}
              />
            </FormControl>
            <FormControl id="text">
              <FormLabel>Message</FormLabel>
              <Textarea
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message here..."
                value={message}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => sendEmail()}
                isLoading={isLoading} // Disable button and show loading spinner when isLoading is true
                loadingText="Sending" // Text to show when loading
                disabled={isLoading} // Disable button when isLoading is true
              >
                Send Email
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
