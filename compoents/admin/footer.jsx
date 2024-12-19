import Title from "../../ui/title";
import Input from "../Input";
import { useFormik } from "formik";
import { footerSchema } from "../../schema/footer";
import { FaTrash, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as Icons from "react-icons/fa";

const iconMap = {
  FaFacebook: FaFacebook,
  FaInstagram: FaInstagram,
  FaTwitter: FaTwitter,
};

function Footer() {
  const [iconName, setIconName] = useState("fa fa-");
  const [linkAddress, setLinkAddress] = useState("https://");
  const [footerData, setFooterData] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footer`
        );
        setFooterData(res.data[0]);
        setSocialMediaLinks(res.data[0].socialMedia);
      } catch (err) {
        console.log(err);
      }
    };
    getFooterData();
  }, []);

  const handleAddIcon = () => {
    if (iconName in iconMap && !icons.includes(iconName)) {
      setIcons([...icons, iconName]);
      setIconName(""); // Clear input after adding
    }
  };

  const handleRemoveIcon = (iconToRemove) => {
    setIcons(icons.filter((icon) => icon !== iconToRemove));
  };

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/footer/${footerData._id}`,
        {
          location: values.location,
          email: values.email,
          phoneNumber: values.phoneNumber,
          desc: values.desc,
          openingHours: {
            day: values.day,
            hour: values.time,
          },
          socialMedia: socialMediaLinks,
        }
      );
      if (res.status === 200) {
        toast.success("Footer updated successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = (e) => {
    setSocialMediaLinks([
      ...footerData?.socialMedia,
      {
        icon: iconName,
        link: linkAddress,
      },
    ]);
    setLinkAddress("https://");
    setIconName("fa fa-");
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        location: footerData?.location,
        email: footerData?.email,
        phoneNumber: footerData?.phoneNumber,
        desc: footerData?.desc,
        day: footerData?.openingHours?.day,
        time: footerData?.openingHours?.hour,
      },
      onSubmit,
      validationSchema: footerSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "location",
      type: "text",
      placeholder: "Your Location",
      value: values.location,
      errorMessage: errors.location,
      touched: touched.location,
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "Your Email",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 3,
      name: "phoneNumber",
      type: "number",
      placeholder: "Your Phone Number",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 4,
      name: "desc",
      type: "text",
      placeholder: "Your Description",
      value: values.desc,
      errorMessage: errors.desc,
      touched: touched.desc,
    },
    {
      id: 5,
      name: "day",
      type: "text",
      placeholder: "Update Day",
      value: values.day,
      errorMessage: errors.day,
      touched: touched.day,
    },
    {
      id: 6,
      name: "time",
      type: "text",
      placeholder: "Update Time",
      value: values.time,
      errorMessage: errors.time,
      touched: touched.time,
    },
  ];

  return (
    <div className="flex-1">
      <form className="p-8 flex-1 lg:mt-0 mt-3" onSubmit={handleSubmit}>
        <Title addclas="text-[40px]">footer Settings</Title>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
          {inputs.map((input) => (
            <Input
              key={input.id} // Corrected key usage
              {...input}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center  ">
          <div className="flex gap-x-2 items-center">
            <Input
              placeholder="Link Address"
              onChange={(e) => setLinkAddress(e.target.value)}
              value={linkAddress}
            />
            <Input
              placeholder="Icon Name"
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
            />
            <button
              className="btn-primary"
              type="button"
              onClick={handleCreate}
            >
              Add
            </button>
          </div>
          <ul className="flex items-center gap-4">
            {socialMediaLinks.map((item, id) => {
              const IconComponent = Icons[item.icon]; // Correct dynamic component rendering

              return (
                <li key={id} className="flex items-center gap-3">
                  <i>
                    <IconComponent />
                  </i>
                </li>
              );
            })}
          </ul>
        </div>
        <button className="btn-primary mt-4" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default Footer;
