import React, { useState, forwardRef }  from 'react';

const GuestDetails = forwardRef(({ formData, setFormData, errors }, ref) => {
  // const [formData, setFormData] = useState({
  //   title: 'Mr',
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: '',
  //   gstEnabled: false
  // });

  // const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleValidation = () => {
    let errs = {};
    if (!formData.firstName) errs.firstName = "Please enter guest's first name";
    if (!formData.lastName) errs.lastName = "Please enter guest's last name";
    if (!formData.email) errs.email = "Please enter guest's email id";
    return errs;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const validationErrors = handleValidation();
  //   setErrors(validationErrors);
  //   if (Object.keys(validationErrors).length === 0) {
  //     console.log('Submit form:', formData);
  //   }
  // };

  return (
    <div ref={ref} className="text-sm mb-4 rounded-md shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-4 bg-white">
      <h1 className="font-semibold text-xl mb-4">Guest Details</h1>

      <form className="space-y-4">
        {/* Title + Full Name */}
        <div className="flex flex-col md:flex-row gap-4">
          <select
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2 w-full md:w-28"
          >
            <option>Mr</option>
            <option>Ms</option>
            <option>Mrs</option>
            <option>Dr</option>
          </select>

          <div className="flex flex-col w-full">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={`border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 w-full ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName}</p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={`border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 w-full ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email Address */}
        <div className="flex flex-col">
          <label className="text-xs mb-1">EMAIL ADDRESS</label>
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleChange}
            className={`border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 w-full ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div className="flex flex-col">
          <label className="text-xs mb-1">MOBILE NUMBER</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              name="countryCode"
              className="border border-gray-300 p-2 rounded-md w-full sm:w-24"
              disabled
            >
              <option value="+91">+91</option>
            </select>
            <input
              type="tel"
              name="phone"
              placeholder="Contact Number"
              value={formData.phone}
              onChange={handleChange}
              className={`border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 w-full ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            />
          </div>
        </div>

        {/* Add Guest Link */}
        <div>
          {/* <button type="button" className="text-blue-600 font-medium text-sm cursor-pointer">
            + Add Guest
          </button> */}
        </div>

        {/* Submit */}
        {/* <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md w-full sm:w-auto cursor-pointer"
          >
            Continue
          </button>
        </div> */}
      </form>
    </div>
  );
});

export default GuestDetails;
