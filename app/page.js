'use client'
import React, { useState } from 'react'
import "./globals.css"
import Login from '@/components/Login';

const Page = () => {
  const [text, setText] = useState("");
  const [task, setTask] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Others');
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  const [selectedDueDate, setSelectedDueDate] = useState('Today');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [href, setHref] = useState('');
  const [isChecked, setIsChecked] = useState(false);


  const Dues = ['Today', 'Tomorrow', 'Pick a date'];
  const categories = ['Household Work', 'Office work', 'Others'];

  // Handle login process
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData.user);

    let userName = userData.user.displayName || userData.user.name;

    if (!userName) {
      const email = userData?.user?.email;
      setEmail(email);

      if (email) {
        // Extract username from email
        const emailParts = email.split('@')[0];
        const extractedName = emailParts.split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
        setName(extractedName);
      } else {
        setName("Guest");
      }
    } else {
      setName(userName);
    }
    
    const hrefLink = `http://localhost:3000/user/${userName ? userName.replace(' ', '_') : 'Guest'}`;
    setHref(hrefLink);
  };

  // Extract username from manually entered email
  const extractUserNameFromEmail = (email) => {
    if (email) {
      const emailParts = email.split('@')[0];
      const userName = emailParts.split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
      setName(userName);
    } else {
      setName("Guest");
    }
  };

  // Handle task submission
  const submitHandler = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      const newTask = {
        text: text,
        category: selectedCategory,
        due: selectedDueDate,
      };
      setTask([...task, newTask]); // adds the task
      setText(""); // clears the text
      setSelectedDueDate('Today');
      setSelectedCategory('Others');
    }
  };

  const handleDelete = (indexToDelete) => {
    setTask(task.filter((_, index) => index !== indexToDelete));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  const handleDueDateChange = (due) => {
    setSelectedDueDate(due);
    setShowCalendarDropdown(false);
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="p-9">
          <h1 className='font-eduaustralia text-5xl text-white italic pl-9 pt-9'>
            Hello anu,<br />Kick start your day...
          </h1>
          
              <div className="flex flex-col items-center font-semibold">
                <ul className="overflow-y-auto max-h-64 mb-5 mt-10 w-full max-w-lg">
                  {task.map((taskItem, index) => (
                    <li key={index} className="font-eduaustralia bg-slate-50 p-3 rounded-md mb-2 text-grey italic text-base hover:bg-none">
                      <div className="grid grid-cols-2 gap-56 mb-2 bg-transparent">
                        <span className="task-calendar">
                          {taskItem.due}
                        </span>
                        <span className="task-title">
                          {taskItem.category}
                        </span>
                      </div>

                      <div className='flex items-center bg-transparent'>
                        <input 
                          id="checked-checkbox" 
                          type="checkbox" 
                          className="custombox"
                          checked = {isChecked}
                          onChange={handleCheckboxChange}
                        />
                         <span className={`bg-slate-50 flex-1 ${isChecked ? 'line-through text-gray-500' : ''}`}>{taskItem.text}</span>
                        <button onClick={() => handleDelete(index)} className="ml-2">
                          <svg 
                            width="20" 
                            height="30" 
                            viewBox="0 0 45 59" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            className='bg-transparent'
                          >
                              <path d="M41.874 20.9606L40.9288 49.5674C40.8483 52.0174 39.8163 54.3396 38.0517 56.0411C36.2871 57.7426 33.9289 58.6895 31.4776 58.6808H13.5201C11.0704 58.6896 8.71352 57.744 6.94917 56.0445C5.18483 54.345 4.1517 52.0252 4.06878 49.5768L3.12365 20.9606C3.10297 20.334 3.33208 19.7248 3.76058 19.267C4.18907 18.8093 4.78185 18.5405 5.40851 18.5198C6.03517 18.4992 6.64437 18.7283 7.10211 19.1568C7.55985 19.5853 7.82862 20.178 7.8493 20.8047L8.79443 49.4185C8.8415 50.64 9.36008 51.7958 10.2413 52.643C11.1224 53.4903 12.2977 53.9631 13.5201 53.9622H31.4776C32.7015 53.963 33.8781 53.4889 34.7596 52.6396C35.641 51.7904 36.1585 50.6322 36.2032 49.4091L37.1483 20.8047C37.169 20.178 37.4378 19.5853 37.8955 19.1568C38.3533 18.7283 38.9625 18.4992 39.5891 18.5198C40.2158 18.5405 40.8086 18.8093 41.2371 19.267C41.6656 19.7248 41.8947 20.334 41.874 20.9606ZM45 11.4408C45 12.0675 44.7511 12.6685 44.3079 13.1116C43.8648 13.5547 43.2638 13.8036 42.6372 13.8036H2.36282C1.73616 13.8036 1.13517 13.5547 0.692055 13.1116C0.248939 12.6685 0 12.0675 0 11.4408C0 10.8142 0.248939 10.2132 0.692055 9.77005C1.13517 9.32694 1.73616 9.078 2.36282 9.078H9.68758C10.4362 9.08001 11.1589 8.80342 11.7148 8.30204C12.2708 7.80066 12.6204 
                              7.11036 12.6955 6.36547C12.8698 4.61813 13.6885 2.99829 14.9919 1.82154C16.2953 0.644801 17.9901 
                              -0.00454445 19.7461 2.39422e-05H25.2515C27.0075 -0.00454445 28.7023 0.644801 30.0058 1.82154C31.3092 2.99829 32.1278 4.61813 32.3022 
                              6.36547C32.3773 7.11036 32.7268 7.80066 33.2828 8.30204C33.8388 8.80342 34.5614 9.08001 35.3101 9.078H42.6348C43.2615 9.078 43.8625 9.32694 44.3056
                              9.77005C44.7487 10.2132 44.9976 10.8142 44.9976 11.4408H45ZM16.7973 9.078H28.205C27.8946 8.36854 27.6915 7.61679 27.6025 6.84749C27.544 6.26507 27.2713
                                5.72512 26.8374 5.33224C26.4035 4.93936 25.8392 4.72153 25.2539 4.72095H19.7485C19.1631 4.72153 18.5988 4.93936 18.1649 5.33224C17.731 5.72512 17.4584 6.26507 
                                17.3998 6.84749C17.3101 7.61691 17.1086 8.36867 16.7973 9.078ZM19.1767 44.8772V24.7577C19.1767 24.131 18.9277 23.5301 18.4846 23.0869C18.0415 22.6438 17.4405 22.3949 
                                16.8139 22.3949C16.1872 22.3949 15.5862 22.6438 15.1431 23.0869C14.7 23.5301 14.451 24.131 14.451 24.7577V44.8866C14.451 45.5133 14.7 46.1143 15.1431 46.5574C15.5862 47.0005 16.1872 47.2494 
                                16.8139 47.2494C17.4405 47.2494 18.0415 47.0005 18.4846 46.5574C18.9277 46.1143 19.1767 45.5133 19.1767 44.8866V44.8772ZM30.5513 44.8772V24.7577C30.5513 24.131 30.3024 23.5301 29.8593 23.0869C29.4162 
                                22.6438 28.8152 22.3949 28.1885 22.3949C27.5618 22.3949 26.9608 22.6438 26.5177 23.0869C26.0746 23.5301 25.8257 24.131 25.8257 24.7577V44.8866C25.8257 45.5133 26.0746 46.1143 26.5177 46.5574C26.9608 47.0005 27.5618 47.2494 28.1885 
                                47.2494C28.8152 47.2494 29.4162 47.0005 29.8593 46.5574C30.3024 46.1143 30.5513 45.5133 30.5513 44.8866V44.8772Z" fill="#404040"/>
                          
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <form onSubmit={submitHandler} className="w-full max-w-lg fixed">
                  <div className="relative top-100px">
                    <textarea
                      type="text"
                      placeholder="Start your day with a plan..."
                      required
                      className="flex w-full h-11 resize-none overflow-hidden p-1.5 text-custom text-left bg-transparent rounded-md border border-gray-500 focus:outline-none focus:border-color absolute text-white"
                      rows="1"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    ></textarea>
                    <button
                      type="button"
                      onClick={() => {setShowCalendarDropdown(!showCalendarDropdown);
                        setShowDropdown(false);
                      }}
                      className='absolute focus:outline-none  top-2 right-20 text-2xl text-white  '
                      title='Pick a date'
                    >
                      <svg width="20" height="28" viewBox="0 0 65 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M46.1908 0.00332652C47.5585 0.0888724 48.6137 1.26111 48.5773 2.65444V6.39155C59.442 7.44561 65 13.4505 65 24.2467V54.1116C65 66.1215 58.1546 72.2222 44.6836 72.2222H20.3164C6.84541 72.2222 0 66.1215 0 54.1116V24.2467C0 17.0599 2.44928 11.9174 7.47343 8.9149L7.82584 8.71406C8.55416 8.37411 9.40838 8.40527 10.1184 8.81748C10.9467 9.29838 11.4359 10.215 11.3811 11.1835C11.3263 12.1521 10.737 13.0056 9.8599 13.3867C6.5314 15.367 4.96135 18.8167 4.96135 24.2467V25.2049H50.7754C52.1454 25.2049 53.256 26.3346 53.256 27.7282C53.256 29.1218 52.1454 30.2516 50.7754 30.2516H4.96135V54.1116C4.96135 63.2787 9.42029 67.0797 20.3164 67.1436H44.6836C55.4227 67.1436 60.0072 63.2468 60.0072 54.0797V24.2147C60.0072 16.2294 56.5217 12.3645 48.5773 11.4383V13.8658C48.3941 15.1597 47.2804 16.1043 45.9962 16.055C44.7119 16.0057 43.6714 14.9784 43.5845 13.6741V2.43085L43.6305 2.03146C43.7327 1.50807 43.9964 1.02735 44.3883 0.662325C44.8782 0.206046 45.5275 -0.0313375 46.1908 0.00332652ZM47.6197 51.267L48.0195 51.2927C48.7052 51.3787 49.3482 51.6931 49.8446 52.193C50.4403 52.793 50.7754 53.6103 50.7754 54.463C50.7754 56.227 49.3695 57.6571 47.6353 57.6571C45.901 57.6571 44.4952 56.227 44.4952 54.463C44.4952 52.6989 45.901 51.2689 47.6353 51.2689L47.6197 51.267ZM32.5628 51.2689L32.9567 51.2937C34.505 51.4908 35.7029 52.8346 35.7029 54.463C35.7029 56.227 34.297 57.6571 32.5628 57.6571C30.8286 57.6571 29.4227 56.227 29.4227 54.463C29.4227 52.6989 30.8286 51.2689 32.5628 51.2689ZM17.5067 51.267L17.906 51.2927C18.5916 51.3787 19.2346 51.6931 19.731 52.193C20.3267 52.793 20.6618 53.6103 20.6618 54.463C20.6618 56.227 19.256 57.6571 17.5217 57.6571C15.7875 57.6571 14.3816 56.227 14.3816 54.463C14.3816 52.6989 15.7875 51.2689 17.5217 51.2689L17.5067 51.267ZM47.6197 38.332L48.0195 38.3565C48.7052 38.4425 49.3482 38.7569 49.8446 39.2569C50.4403 39.8568 50.7754 40.6741 50.7754 41.5268C50.7754 43.2909 49.3695 44.7209 47.6353 44.7209C45.901 44.7209 44.4952 43.2909 44.4952 41.5268C44.4952 39.7627 45.901 38.3327 47.6353 38.3327L47.6197 38.332ZM32.5628 38.3327L32.9567 38.3576C34.505 38.5547 35.7029 39.8984 35.7029 41.5268C35.7029 43.2909 34.297 44.7209 32.5628 44.7209C30.8286 44.7209 29.4227 43.2909 29.4227 41.5268C29.4227 39.7627 30.8286 38.3327 32.5628 38.3327ZM17.5067 38.332L17.906 38.3565C18.5916 38.4425 19.2346 38.7569 19.731 39.2569C20.3267 39.8568 20.6618 40.6741 20.6618 41.5268C20.6618 43.2909 19.256 44.7209 17.5217 44.7209C15.7875 44.7209 14.3816 43.2909 14.3816 41.5268C14.3816 39.7627 15.7875 38.3327 17.5217 38.3327L17.5067 38.332ZM18.9191 0.384393C20.198 0.384393 21.2727 1.3617 21.4155 2.65444V6.13602H35.6087C36.9787 6.13602 38.0894 7.26577 38.0894 8.65938C38.0894 10.053 36.9787 11.1827 35.6087 11.1827H21.3527V13.7061C21.3527 14.3809 21.087 15.0276 20.615 15.5017C20.143 15.9759 19.5039 16.238 18.8406 16.2294L18.4778 16.1932C17.2959 15.9855 16.4067 14.93 16.4225 13.6741V2.65444L16.4926 2.27674C16.7825 1.17601 17.7681 0.384393 18.9191 0.384393Z" fill="#FEFEFE"/>
                      </svg>
                    </button>
                    {showCalendarDropdown && (
                      <ul className='absolute mt-2 bg-grey border text-white right-10   bottom-3px '>
                        {Dues.map((due) => (
                          <li
                            key={due}
                            className='px-4 py-2 cursor-pointer hover:bg-slate-500'
                            onClick={() => handleDueDateChange(due)}
                          >
                            {due}
                          </li>
                        ))}
                      </ul>
                    )}
                    <button 
                      type="button"
                      onClick={() => {setShowDropdown(!showDropdown);
                        setShowCalendarDropdown(false);
                      }}
                      className='absolute focus:outline-none right-13 top-2 text-gray-100  '
                      title='Type of work'
                    >
                      &#9650;
                    </button>
                    {showDropdown && (
                      <ul className='absolute mt-2 bg-grey border text-white right-10 bottom-3px'>
                        {categories.map((category) => (
                          <li
                            key={category}
                            className={`px-4 py-2 hover:bg-slate-500 cursor-pointer ${
                              selectedCategory === category ? 'bg-selected' : 'bg-default'
                            }`}
                            onClick={() => handleCategoryChange(category)}
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    )}
                    <button type="submit" className="absolute top-5 right-3 transform -translate-y-1/2 group">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 89 89"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-colors duration-300 text-gray-500 group-hover:text-white group-hover:ease-out"
                      >
                        <circle cx="44.5" cy="44.5" r="44.5" fill="#4C4C4C" />
                        <path
                          fill="currentColor"
                          d="M42 61C42 62.1046 42.8954 63 44 63C45.1046 63 46 62.1046 46 61H42ZM45.4142 27.5858C44.6332 26.8047 43.3668 26.8047 42.5858 27.5858L29.8579 40.3137C29.0768 41.0948 29.0768 42.3611 29.8579 43.1421C30.6389 43.9232 31.9052 43.9232 32.6863 43.1421L44 31.8284L55.3137 43.1421C56.0948 43.9232 57.3611 43.9232 58.1421 43.1421C58.9232 42.3611 58.9232 41.0948 58.1421 40.3137L45.4142 27.5858ZM46 61L46 29H42L42 61H46Z"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
           )}
    </div>
  );
};

export default Page;
