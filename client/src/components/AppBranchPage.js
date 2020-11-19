import React, { Component } from 'react'

import BranchCardComponent from './BranchCardComponent'

class AppBranchPage extends Component {
    static propTypes = {

    }

    render() {
        const branches = [{
            title: "Computer Science and Engineering",
            img: "/images/cse.jpg",
            description: "Computer science is the study of algorithmic processes and computational machines. As a discipline, computer science spans a range of topics from theoretical studies of algorithms, computation and information to the practical issues of implementing computing systems in hardware and software. Computer science addresses any computational problems, especially information processes, such as control, communication, perception, learning, and intelligence.",
            url: "cse"

        }, {
            title: "Mechanical Engineering",
            img: "/images/mech.jpg",
            description: "Mechanical engineering is the study, design, development, construction, and testing of mechanical and thermal sensors and devices, including tools, engines, and machines. Mechanical engineering careers center on creating technologies to meet a wide range of human needs.Mechanical engineering subjects include automobile engineering, manufacturing engineering, power plant engineering, thermal engineering, and mechatronics engineering, which is a combination of electrical, computer, and mechanical engineering.",
            url: "mech"
        }
        , {
            title: "Electronics Engineering",
            img: "/images/electronics.jpg",
            description: "Electronic engineering (also called electronics and communications engineering) is an electrical engineering discipline which utilizes nonlinear and active electrical components (such as semiconductor devices, especially transistors and diodes) to design electronic circuits, devices, integrated circuits and their systems. The discipline typically also designs passive electrical components, usually based on printed circuit boards.",
            url: "etrx"
        }
        , {
            title: "Electrical Engineering",
            img: "/images/electrical.jpg",
            description: "Electrical engineering is an engineering discipline concerned with the study, design and application of equipment, devices and systems which use electricity, electronics, and electromagnetism. It emerged as an identifiable occupation in the latter half of the 19th century after commercialization of the electric telegraph, the telephone, and electrical power generation, distribution and use.",
            url: "et"
        }]
        return (
            <div>
                {
                    branches.map(branch => (
                        <BranchCardComponent branch={branch} />
                    ))
                }
            </div>
        )
    }
}

export default AppBranchPage
