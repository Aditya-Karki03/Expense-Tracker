import { Card, CardBody,Stack,Heading,Flex} from "@chakra-ui/react"
import { IconType } from "react-icons";

export default function CardComp({Props,cardTitle}:{Props:IconType,cardTitle:string}){
    return(
<Card w='250px' h='270px' margin={2} bgColor={'#5C8D7B'} textColor={'#fff'} _hover={{transform:'scale(1.1)',transition:'0.5s ease-in-out'}} >
  <CardBody>
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <div className="flex justify-center text-8xl p-2 border border-black rounded-2xl bg-black"> <Props /> </div>
            <Stack mt='6' spacing='3'>
                <Flex direction={'row'} justify={'center'}>
                    <Heading size='md'>{cardTitle}</Heading>
                </Flex>
            </Stack>
    </div>
  </CardBody>
  
</Card>
    )
}