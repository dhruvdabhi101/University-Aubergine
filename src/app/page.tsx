"use client"
import { Button } from "@/components/ui/button";
import CollegeCard from "@/components/ui/CollegeCard";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



type College = {
  alpha_two_code: string
  country: string
  domains: string[] | null
  name: string
  "state-province": string | null
}

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filter, setFilter] = useState('');
  const [stateProvidance, setStateProvidance] = useState<string[]>([]);

  const handleChange = (e: any) => {
    setSearchText(e.target.value);
  }

  const searchCountry = async () => {
    setLoading(true);
    try {
      if (searchText == '') {
        return;
      }
      const res = await axios.get(`http://universities.hipolabs.com/search?country=${searchText}`)
      setData(res.data);
      setFilterData(res.data);
      const stateData: string[] | null = res.data.map((item: any) => item['state-province']);
      const uniqueValuesSet = new Set(stateData);
      setStateProvidance(Array.from(uniqueValuesSet))
      setFilter('')
      console.log(stateProvidance)
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  }
  const updateFilter = (e: string) => {
    setFilter(e);
    const fData = data.filter(item => item['state-province'] === filter)
    setFilterData(fData)
    setFilterData(fData)
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-5 ">
        <div className="flex flex-row justify-between items-center gap-7">
          <div className="flex w-50 flex-row gap-4">
            <Input value={searchText} onChange={handleChange} placeholder="Search country" />
            <Button onClick={searchCountry} disabled={loading}> {loading ? "loading" : 'Submit'} </Button>
          </div>
          <div className="border-gray-700 border-[1px] p-2 rounded-md">
            <DropdownMenu>
              <DropdownMenuTrigger>{filter ? filter : 'State'}</DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => {
                  setFilterData(data)
                  setFilter('')
                }}> Select </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup onValueChange={updateFilter}>
                  {stateProvidance?.map((item: string, index: number) => {
                    if (item) {
                      return (<DropdownMenuRadioItem key={index} value={item}>{item}</DropdownMenuRadioItem>)
                    }
                  }
                  )}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>

            </DropdownMenu>
          </div>


        </div>
        <div className="flex flex-row  items-center flex-wrap justify-evenly w-[70%]">
          {filterData?.map((item: any, index: number) => {
            return <CollegeCard name={item.name} webPages={item.web_pages} key={index} />
          })}
        </div>
      </div>
    </>
  );
}
