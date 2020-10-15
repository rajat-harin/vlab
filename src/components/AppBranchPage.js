import React, { Component } from 'react'

import BranchCardComponent from './BranchCardComponent'

class AppBranchPage extends Component {
    static propTypes = {

    }

    render() {
        const branches = [{
            title: "Computer Science and Engg.",
            img: "/logo.png",
            description: "Not Available.",
            url: "cse"

        }, {
            title: "Mechanical Engg.",
            img: "/logo.png",
            description: "Not Available.",
            url: "mech"
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
