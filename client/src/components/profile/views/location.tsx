import  Row from "react-bootstrap/Row";
import  Col from "react-bootstrap/Col";

import { SteadyIconInput } from "../../tools/steady-group/steady-icon-input/steady-icon-input";
import { SteadySelect } from "../../tools/steady-group/steady-select/select";
let companyLocation = [
  { label: "Country", name: "country", type: "select" },
  { label: "Area", name: "area", type: "select" },
  { label: "Block", name: "block", type: "text" },
  { label: "Avenue", name: "avenue", type: "text" },
  { label: "Street", name: "street", type: "text" },
  { label: "Building", name: "building", type: "text" },
  { label: "Floor", name: "floor", type: "text" },
  { label: "Flat", name: "flat", type: "text" },
];
interface iProps {
  t: Function;
  setFieldValue: Function;
  values: any;
  handleBlur: (e: React.FocusEvent) => void;
  lang: string;
  handleChange: Function;
  setCountry: Function;
  countries?: any;
  area?: any;
  errors?: { [key: string]: any };
  touched?: { [key: string]: any };
}

export const Location = ({
  t,
  setFieldValue,
  values,
  handleBlur,
  lang,
  handleChange,
  setCountry,
  area = [],
  countries = [],
  errors,
  touched,
}: iProps) => {
  const addArea = (id: number) => {
    setFieldValue("area_id", id);
  };
  const addCountry = (id: number) => {
    setCountry(id);
  };

  return (
    <Col xs={12}>
      <Col xs={12} className="p-sm-1 p-0">
        <Row className="d-flex justify-content-center">
          <Col sm={10} xs={12}>
            <Row className="p-sm-1 pb-3 pb-sm-1 justify-content-start gy-sm-2">
              {companyLocation.map((ele, index: number) => {
                if (ele.type === "select") {
                  return (
                    <Col sm={6} xs={12} key={index}>
                      <SteadySelect
                        label={t(ele.label)}
                        name={ele.name}
                        options={
                          (ele.name === "country" && countries) ||
                          (ele.name === "area" && area)
                        }
                        disabled={false}
                        value={values[ele.name]}
                        exteriorFunction={
                          ele.name === "area" ? addArea : addCountry
                        }
                        handleBlur={handleBlur}
                        error={errors ? errors[ele.name] : ""}
                        touched={touched ? touched[ele.name] : false}
                      />
                    </Col>
                  );
                }
                return (
                  <Col sm={6} xs={12} key={index}>
                    <SteadyIconInput
                      label={t(ele.label)}
                      name={ele.name}
                      type="text"
                      disabled={false}
                      value={values ? values[ele.name] : ""}
                      onChange={handleChange}
                      handleBlur={handleBlur}
                      error={errors?errors[ele.name]:''}
                      touched={touched?touched[ele.name]:false}
                    />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Col>
    </Col>
  );
};
