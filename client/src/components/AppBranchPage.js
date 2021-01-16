import React, { Component } from 'react'

import BranchCardComponent from './BranchCardComponent'

class AppBranchPage extends Component {
    static propTypes = {

    }

    render() {
        const branches = [{
            id: 1,
            title: "Computer Science and Engineering",
            img: "/images/cse.jpg",
            description: "Computer science is the study of algorithmic processes and computational machines. As a discipline, computer science spans a range of topics from theoretical studies of algorithms, computation and information to the practical issues of implementing computing systems in hardware and software. Computer science addresses any computational problems, especially information processes, such as control, communication, perception, learning, and intelligence.",
            url: "cse"

        }, {
            id: 2,
            title: "Mechanical Engineering",
            img: "/images/mech.jpg",
            description: "Mechanical engineering is the study, design, development, construction, and testing of mechanical and thermal sensors and devices, including tools, engines, and machines. Mechanical engineering careers center on creating technologies to meet a wide range of human needs.Mechanical engineering subjects include automobile engineering, manufacturing engineering, power plant engineering, thermal engineering, and mechatronics engineering, which is a combination of electrical, computer, and mechanical engineering.",
            url: "mech"
        }
        , {
            id: 3,
            title: "Electronics Engineering",
            img: "/images/electronics.jpg",
            description: "Electronic engineering (also called electronics and communications engineering) is an electrical engineering discipline which utilizes nonlinear and active electrical components (such as semiconductor devices, especially transistors and diodes) to design electronic circuits, devices, integrated circuits and their systems. The discipline typically also designs passive electrical components, usually based on printed circuit boards.",
            url: "etrx"
        }
        , {
            id: 4,
            title: "Electrical Engineering",
            img: "/images/electrical.jpg",
            description: "Electrical engineering is an engineering discipline concerned with the study, design and application of equipment, devices and systems which use electricity, electronics, and electromagnetism. It emerged as an identifiable occupation in the latter half of the 19th century after commercialization of the electric telegraph, the telephone, and electrical power generation, distribution and use.",
            url: "et"
        }
        , {
            id: 5,
            title: "Electronics And Telecommunication Engineering",
            img: "/images/etc.jpg",
            description: "Electronics and Telecommunication Engineering is a well-known branch of engineering. It deals with the reception of video, microprocessors, analogue communication, digital and analogue integrated circuits, satellite communication, antennae and wave progression, solid-state devices, voice and data etc.",
            url: "etc"
        }
        , {
            id: 6,
            title: "Infomation Technology",
            img: "/images/it.jpg",
            description: "Information Technology involves an architectural approach for planning, analyzing, designing, and implementing applications.",
            url: "it"
        }
        , {
            id: 7,
            title: "Civil Engineering",
            img: "/images/civil.jpg",
            description: "Civil engineering is a professional engineering discipline that deals with the design, construction, and maintenance of the physical and naturally built environment, including public works such as roads, bridges, canals, dams, airports, sewerage systems, pipelines, structural components of buildings, and railways.",
            url: "ce"
        },
        , {
            id: 8,
            title: "Artificial Intelligence and Machine Learning",
            img: "/images/aiml.jpg",
            description: "Artificial intelligence (AI) brings with it a promise of genuine human-to-machine interaction. When machines become intelligent, they can understand requests, connect data points and draw conclusions. They can reason, observe and plan.",
            url: "aiml"
        }]
        return (
            <div>
                {
                    branches.map(branch => (
                        <BranchCardComponent key= {branch.id} branch={branch} />
                    ))
                }
            </div>
        )
    }
}

export default AppBranchPage
