console.log("web-scrapping started");

const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");
const xlsx = require("xlsx");

let arr = [];

const url = "https://www.quikr.com/jobs/internship+zwqxj2363381545";

const getdata = async (url) => {
  try {
    const response = await axios.get(url, {
      "content-type": "text/html"
    })

    // console.log(response);
    // fs.writeFileSync("wiki.txt", response.data);
    // return response.data;

  } catch (error) {
    console.log("ERROR", error);
  }
}

getdata(url);

const pagedata = () => {
  return fs.readFileSync("wiki.txt", { encoding: "utf-8" });
}


const strdata = pagedata();
const $ = cheerio.load(strdata);

// const jobs = $(".job-card").find(".m0").text();

const jobs2 = $(".job-card").each((idx, ele)=>{
      const title = $(ele).find(".m0").text();
      const company = $(ele).find("div[title]").text();
      const location = $(ele).find(".city").text();
      const job_type = $(ele).find(".attributeVal").text();
      const posted = $(ele).find(".jsPostedOn").text();
      const job_desc = $(ele).find(".subRoles").find("span").text();
      arr.push({
        "Title" : title,
          "Company" : company ,
          "Location" : location ,
          "Job Type" : job_type,
          "Posted On" : posted,
          "Job Desc" : job_desc,
      })
})


const workbook = xlsx.utils.book_new();
const sheet = xlsx.utils.json_to_sheet(arr);

xlsx.utils.book_append_sheet(workbook, sheet, "scrapped1");
xlsx.writeFile(workbook, 'Data.xlsx')

// console.log(arr);