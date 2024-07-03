import Link from "next/link";
import { Button } from "./button";
import { Card, CardContent, CardFooter, CardHeader } from "./card"
import { usePDF } from "react-to-pdf";

type CollegeCardProps = {
  name: string,
  webPages: string[] | null;
}

const CollegeCard = (props: CollegeCardProps) => {
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

  return (
    <div className="w-[50%]"ref={targetRef}>
      <Card className="m-4" >
        <div>
          <CardHeader>
            {props.name}
          </CardHeader>
          <CardContent>
            <Link href={props.webPages?.length ? props.webPages[0] : ''} className="text-gray-700 underline"> College Link </Link>
          </CardContent>
        </div>
        <CardFooter>
          <Button onClick={() => toPDF()}> Download </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
export default CollegeCard

