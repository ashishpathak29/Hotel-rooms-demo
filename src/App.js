import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


/**
 * App class is use for manage hotel rooms cards
 *  * App class extends Components
 */
class App extends Component {

    constructor() {
        super();

        this.state = {
            hotelRooms: [
                {
                    roomNo: 1,
                    adult: 1,
                    children: 0,
                    disabled: false,
                    checked: false
                },
                {
                    roomNo: 2,
                    adult: 1,
                    children: 0,
                    disabled: true,
                    checked: false
                },
                {
                    roomNo: 3,
                    adult: 1,
                    children: 0,
                    disabled: true,
                    checked: false
                },{
                    roomNo: 4,
                    adult: 1,
                    children: 0,
                    disabled: true,
                    checked: false
                }]
        }
    }

    componentWillMount() {
        const hotelRooms = localStorage.getItem('hotelRooms');
        if (hotelRooms) {
            this.setState({hotelRooms: JSON.parse(hotelRooms)});
        }
    }

    /**
     * HandleRoomCheck method use for manage enable and disable functionality for rooms
     * Room 1 is auto enable
     * @param selectedRoom
     */
    handleRoomCheck = selectedRoom => evt => {
        const newHotelRooms = this.state.hotelRooms.map((room, sidx) => {
            if (room.roomNo !== 1 && room.roomNo <= selectedRoom && evt.target.checked) {
                return { ...room, disabled: false, checked: true };
            }
            if (room.roomNo !== 1 && room.roomNo >= selectedRoom && !evt.target.checked) {
                return { ...room, disabled: true, checked: false, adult: 1, children: 0 };
            }
            if (room.roomNo !== 1 && room.roomNo > selectedRoom) {
                return { ...room, disabled: true, checked: false };
            }
            return { ...room };
        });
        this.setState({ hotelRooms: newHotelRooms });
    };

    /**
     * handleAdultSelect method use for change value of adult select box and store value in state.
     * @param roomNo
     */
    handleAdultSelect = roomNo => evt => {
        const newHotelRooms = this.state.hotelRooms.map((room, sidx) => {
            if (roomNo === room.roomNo) {
              return { ...room, adult: parseInt(evt.target.value) };
            }
            return { ...room };
        });
        this.setState({ hotelRooms: newHotelRooms });
    };

    /**
     * handleChildSelect method use for change value of children select box and store value in state.
     * @param roomNo
     */
    handleChildSelect = roomNo => evt => {
        const newHotelRooms = this.state.hotelRooms.map((room, sidx) => {
            if (roomNo === room.roomNo) {
                return { ...room, children: parseInt(evt.target.value) };
            }
            return { ...room };
        });
        this.setState({ hotelRooms: newHotelRooms });
    }

    /**
     * submit method is use for save the data to local storage
     */
    submit = () => {
        localStorage.setItem('hotelRooms', JSON.stringify(this.state.hotelRooms));
        alert('Hotel rooms data successfully saved');
    }

    render() {
        return (
            <div className="App">
                <div className='container'>
                    <div className='row'>
                        {this.state.hotelRooms.map((room, idx) => (
                           
                            <div className='col-sm-3' key={idx}>
                                <div className="card">
                                    {room.roomNo === 1 ?
                                        <h5 className="card-header">Room 1</h5> :
                                        <div className="card-header">
                                            <label className="checkbox-inline">
                                                <input type="checkbox" checked={room.checked} onChange={this.handleRoomCheck(room.roomNo)} />
                                            Room {room.roomNo}
                                            </label>
                                        </div>
                                    }
                                    <div className={room.disabled ? 'card-body disabled' : 'card-body'}>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="sel1">Adults (18+)</label>
                                                    <select className="form-control" id="sel1" value={room.adult} onChange={this.handleAdultSelect(room.roomNo)}>
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="sel1">Children (0-17)</label>
                                                    <select value={room.children} className="form-control" id="sel1" onChange={this.handleChildSelect(room.roomNo)}>
                                                        <option value={0}>0</option>
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}

                            <div className="submit-btn">
                                <button className="btn btn-success" type="submit" onClick={this.submit}>Submit</button>
                            </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default App;



