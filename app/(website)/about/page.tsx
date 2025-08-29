import AboutPage from "./about"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "About - Vyapar",
    description: "About Vyapar",
}

export default function About() {
    return (
        <AboutPage />
    )
}