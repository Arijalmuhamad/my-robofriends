import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css"

//mendeskripsikan aplikasi kita ke state
// const state = {
//     robots: robots,
//     searchfield: ''
// }

//ubah kembali ke class componenet
class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }


    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
         .then(response=>  response.json())
         .then(users => this.setState({ robots:users }));
    }

    onSearchChange = (event) => {
       //3. another rule, kapanpun kita ingin mengubah state gunakan seperti dibawah
        this.setState({ searchfield: event.target.value });

        //1.ini akan terjadi error, kares this nya tertuju ke nilai method diatas yaitu searchbox
        //2.solusinya adalah mengguanakan arrow function
        // const filteredRobots = this.state.robots.filter(robot =>{
        //     return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        // }); 
    }

    render() {
        const { robots, searchfield } = this.state;
        // 4. untuk digunakan maka filter robot dipindahkan kesini
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return !robots.length ?
        <h1>Loading</h1> :
        (
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <CardList robots = {filteredRobots}/>
                </Scroll>
            </div>
            
        );
       
    }
}

export default App;