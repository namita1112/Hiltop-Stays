import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { useState, useRef, useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import { useLocation, useNavigate } from 'react-router-dom';
const SearchForm = ({ initialData }) => {
    const dateRef = useRef();
    const optionsRef = useRef();
    const destinationRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dateRef.current && !dateRef.current.contains(event.target)) {
                setOpenDate(false);
            }
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setOpenOptions(false);
            }
            if (destinationRef.current && !destinationRef.current.contains(event.target)) {
                setOpenDestination(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        }, []
    );

    // const [destination, setDestination] = useState('');
    // const [date, setDate] = useState([
    //     {
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     key: 'selection',
    //     },
    // ]);

    const [openDate, setOpenDate] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);

    // const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });

    // const handleOption = (name, operation) => {
    //     setOptions((prev) => ({
    //     ...prev,
    //     [name]: operation === 'i' ? prev[name] + 1 : prev[name] - 1,
    //     }));
    // };

    const handleOption = (name, operation) => {
        setSearchData((prev) => ({
            ...prev,
            options: {
            ...prev.options,
            [name]: operation === 'i'
                ? prev.options[name] + 1
                : prev.options[name] - 1,
            },
        }));
    };

    const { searchData, setSearchData } = useSearch();
    useEffect(() => {
        if (initialData) {
            setSearchData(initialData);
        }
    }, [initialData]);


    const { destination, date, options } = searchData;
    const navigate = useNavigate();
    const location = useLocation();
    const handleSearch = () => {
        if (location.pathname.startsWith("/hotels/")) {
            console.log("Stay on hotel page:", searchData);
            window.scrollTo({
                top: 1500,   // adjust this value depending on how far you want to scroll
                behavior: "smooth"
            });
        }else{
            navigate('/hotelsSearch', { state: searchData });
        }
    };

    const [openDestination, setOpenDestination] = useState(false);
    return (
        <div className="bg-white text-gray-700 rounded-lg px-6 py-4 flex flex-col md:flex-row items-center gap-4 mt-5 w-full max-w-6xl mx-auto relative">
            {/* Destination Input */}
            <div className="flex flex-col relative" ref={destinationRef}>
                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                    <FontAwesomeIcon icon={faBed} className="text-gray-500" />
                    Destination
                </label>
                <input
                    type="text"
                    placeholder="Where are you going?"
                    className="rounded border border-gray-300 px-3 py-1.5 text-sm w-64 outline-none"
                    value={destination || 'Mahabaleshwar'}
                    onChange={(e) => setSearchData((prev) => ({ ...prev, destination: e.target.value }))}
                    // onChange={(e) => setDestination(e.target.value)}
                    // onFocus={() => setOpenDestination(true)}
                />

                {/* {openDestination && (
                    <div className="absolute top-full mt-2 w-64 bg-white border border-gray-300 rounded shadow z-30">
                    <div className="p-2 text-sm text-gray-600">Recent Searches</div>
                    <ul className="text-sm">
                        <li className="p-2 hover:bg-gray-100 cursor-pointer"><FontAwesomeIcon icon={faClockRotateLeft} /> Shivanya Palace - A Purple Mansion</li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer"><FontAwesomeIcon icon={faClockRotateLeft} /> Mahabaleshwar Hillside Resort</li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer"><FontAwesomeIcon icon={faClockRotateLeft} /> Lakeview Stay</li>
                    </ul>
                    <div className="p-2 text-sm text-gray-600">Popular</div>
                    <ul className="divide-y text-sm">
                        <li className="p-2 hover:bg-gray-100 cursor-pointer"><TrendingUpIcon style={{ fontSize: 24, color: '#1f1f1f' }} /> mahabaleshwar</li>
                    </ul>
                    </div>
                )} */}
            </div>

            {/* Date Range Picker */}
            <div className="flex flex-col relative z-20" ref={dateRef}>
                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                <FontAwesomeIcon icon={faCalendarDays} className="text-gray-500" />
                CheckIn-CheckOut
                </label>
                <span
                onClick={() => setOpenDate(!openDate)}
                className="cursor-pointer border border-gray-300 rounded px-3 py-1.5 text-sm w-64"
                >
                {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}
                </span>
                {openDate && (
                <div className="absolute top-20 z-50 left-1/2 transform -translate-x-1/2 max-w-sm w-[95vw] overflow-x-hidden">
                    <DateRange
                    editableDateInputs
                    onChange={(item) => {
                        setSearchData((prev) => ({ ...prev, date: [item.selection] }));
                        const { startDate, endDate } = item.selection;
                        // ✅ Auto-close when endDate is chosen
                        if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
                            setOpenDate(false);
                        }
                    }}
                    // onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    minDate={new Date()}
                    className="shadow-lg"
                    />
                </div>
                )}
            </div>

            {/* Guest Options */}
            <div className="flex flex-col relative z-10" ref={optionsRef}>
                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                <FontAwesomeIcon icon={faPerson} className="text-gray-500" />
                Guests
                </label>
                <span
                onClick={() => setOpenOptions(!openOptions)}
                className="cursor-pointer border border-gray-300 rounded px-3 py-1.5 text-sm w-64"
                >
                {`${options.adult} adult · ${options.children} children · ${options.room} room`}
                </span>
                {openOptions && (
                <div className="absolute top-20 bg-white border border-gray-300 rounded p-4 shadow-lg mt-2 w-64">
                    {['adult', 'children', 'room'].map((key) => (
                    <div key={key} className="flex justify-between items-center mb-2">
                        <span className="capitalize">{key}</span>
                        <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleOption(key, 'd')}
                            disabled={options[key] <= (key === 'adult' || key === 'room' ? 1 : 0)}
                            className="px-2 py-0.5 bg-gray-200 rounded disabled:opacity-50"
                        >
                            -
                        </button>
                        <span>{options[key]}</span>
                        <button
                            onClick={() => handleOption(key, 'i')}
                            className="px-2 py-0.5 bg-gray-200 rounded"
                        >
                            +
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>

            {/* Search Button */}
           <div className="flex justify-center md:items-end md:self-end w-full md:w-auto">
                <button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-md shadow hover:opacity-90 transition-opacity w-full md:w-auto duration-200 cursor-pointer"
                >
                    Search
                </button>
            </div>
        </div>
    )
}

export default SearchForm
