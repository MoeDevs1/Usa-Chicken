import { NextResponse } from "next/server";

export default function middleware(req){
    let verify = req.cookies.get("sessionToken");
    let url = req.url
    
   

    if (!verify && url === "http://localhost:3000/userProfile") {
      return NextResponse.redirect("http://localhost:3000");
    }


  }