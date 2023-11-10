import React from "react"
import Link from "next/link"
import Image from "next/image"
import {Container, Row, Col} from "reactstrap"
import { Nav__link } from "@/constants"
import "./style.module.scss"



const Header = () => {
  return (
   <Container className="text-center items-center justify-between">
    <Row className="">
        <Col lg="2">
            <Link href={"/"}>
                <Image src={"next.svg"}
                width={100}
                height={100}
                alt="logo-image"
                className="mt-4"/>
            </Link>
        </Col>
        <Col lg = "8" className="justify-items-center">
            <ul className="mt-4">
            {
                Nav__link.map((item) => (
                    <Link href={item.herf} key={item.key}
                    className="mx-3">
                        {item.label}
                    </Link>
                ))
            }
            </ul>
        </Col>
        <Col lg= "2" className="flex">
          <div className="mt-4 mx-4">
            <Link href={"/login"} className="">
                Login
            </Link>
          </div>
          <div className="mt-4">
            <Link href={"/login"} className="">
                Regsiter
            </Link>
          </div>
        </Col>
    </Row>
   </Container>
  )
}

export default Header