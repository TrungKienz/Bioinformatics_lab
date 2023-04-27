import { SaveOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Affix, Button, Col, Form, Input, Radio, Row, Space, Tooltip } from 'antd';
import { useState } from 'react';
import CustomInput from '../CustomInput';
import './colorectalCancer.css';
import COLORECTAL from './colorectalTemplate';
const formItemLayout = {
    labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
        md: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: { span: 8 },
        sm: { span: 12 },
        md: {
            span: 12,
        },
    },
};

export default () => {
    const [generalInfoForm] = Form.useForm();
    const [genTestForm] = Form.useForm();
    const [bottom, setBottom] = useState(10);

    const showForm = () => {
        console.log(genTestForm.getFieldsValue());
    };
    const [data, SetData] = useState();

    // useEffect(async () => {
    //   await getHealthRecord()
    // }, [])

    return (
        <PageContainer
            header={{
                title: 'BỆNH ÁN UNG THƯ PHỔI K',
            }}
        >
            <h3>PHẦN 1: THÔNG TIN CHUNG</h3>
            <p style={{ color: 'red' }}>
                (*Chứa toàn bộ thông tin bệnh nhân từ khi phát hiện bệnh đến ngày bắt đầu theo dõi)
            </p>
            <h4>I{'>'} HÀNH CHÍNH</h4>
            <Form {...formItemLayout} form={generalInfoForm} labelAlign="left">
                <Form.Item name="fullname" label="Họ và tên">
                    <Input></Input>
                </Form.Item>
                <Form.Item name="bod" label="Năm sinh">
                    <Input type="date"></Input>
                </Form.Item>
                <Form.Item label="Giới tính">
                    <Radio.Group>
                        <Radio value="male">Nam</Radio>
                        <Radio value="female">Nữ</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="job" label="Nghề nghiệp">
                    <Input></Input>
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ(Huyện - Tỉnh TP)">
                    <Input></Input>
                </Form.Item>
                <Form.Item name="phone" label="SĐT liên lạc">
                    <Input></Input>
                </Form.Item>
            </Form>
            {COLORECTAL.generalInfo.map((category, categoryId) => {
                return (
                    <div key={categoryId}>
                        {category.name.includes('IV> KHÁM LÂM SÀNG') && <h3>PHẦN 2:THEO DÕI BỆNH NHÂN</h3>}
                        <h4 className="category-title">{category.name}</h4>
                        <table>
                            <thead></thead>
                            <tbody>
                                {category.listQuestions.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            {/* <td style={{ width: "10px" }}>{index}</td> */}
                                            {item.map((listQuestion, listId) => {
                                                return (
                                                    <td
                                                        colspan={
                                                            item.length === 1
                                                                ? '100%'
                                                                : item.length === 2 && listId === 1
                                                                    ? '2'
                                                                    : '1'
                                                        }
                                                        key={listId}
                                                    >
                                                        {listQuestion.map((ques, quesId) => {

                                                            if (ques?.question && ques.type !== 'title' && ques.type !== 'none') {
                                                                return (
                                                                    <Row key={quesId}>
                                                                        <Col span={24} style={{ minHeight: '48px' }} className="cell">
                                                                            {ques.question}
                                                                        </Col>
                                                                        <Col span={18}>
                                                                            {' '}
                                                                            <CustomInput
                                                                                className="cell"
                                                                                quesId={quesId}
                                                                                ques={ques}
                                                                                index={index}
                                                                                categoryId={categoryId}
                                                                                listId={listId}
                                                                                COLORECTAL={COLORECTAL}
                                                                                templateInfo={
                                                                                    COLORECTAL.generalInfo[categoryId].listQuestions[index][listId][
                                                                                    quesId
                                                                                    ]
                                                                                }
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                );
                                                            }

                                                            return (
                                                                <>
                                                                    <div
                                                                        key={quesId}
                                                                        style={{ minHeight: '48px' }}
                                                                        className={ques?.unit === 'bao/ngày' || ques?.unit === 'năm' ? 'cell half-width' : 'cell full-width'}
                                                                    >
                                                                        <div className="full-width">
                                                                            <CustomInput
                                                                                quesId={quesId}
                                                                                ques={ques}
                                                                                index={index}
                                                                                categoryId={categoryId}
                                                                                listId={listId}
                                                                                COLORECTAL={COLORECTAL}
                                                                                templateInfo={
                                                                                    COLORECTAL.generalInfo[categoryId].listQuestions[index][listId][
                                                                                    quesId
                                                                                    ]
                                                                                }
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                    {ques?.unit === 'bao/ngày' && ' x '}
                                                                </>
                                                            );
                                                        })}{' '}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            })}
            <h4>VII{'>'} ĐÁNH GIÁ ĐÁP ỨNG ĐIỀU TRỊ </h4>
            <div>
                42. Triệu chứng lâm sàng sau điều trị: Mức độ: 0. Không 1. Ít 2. Vừa 3. Nhiều
                <table>
                    <thead>
                        <tr>
                            {COLORECTAL.clinicalSymptoms.header.map((title, titleId) => (
                                <th key={titleId}>{title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {COLORECTAL.clinicalSymptoms.listQuestions.map((res, resId) => {
                            return (
                                <tr key={resId}>
                                    {res.map((ques, quesId) => {
                                        return (
                                            <td key={quesId}>
                                                <CustomInput quesId={quesId} ques={ques} COLORECTAL={COLORECTAL} templateInfo={ques} />
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                *Với PS là thang đánh giá toàn trạng (PS) theo ECOG
                <p>• PS 0: Hoạt động bình thường.</p>
                <p>• PS 1: Bị hạn chế hoạt động nặng, nhưng đi lại được và làm được việc nhẹ.</p>
                <p>
                    • PS 2: Đi lại được nhưng không làm được các việc, hoàn toàn chăm sóc được bản thân, phải
                    nghỉ ngơi dưới 50% thời gian thức.
                </p>
                <p>• PS 3: Chỉ chăm sóc bản thân tối thiểu, phải nghỉ trên 50% thời gian.</p>
                <p>• PS 4: Mất khả năng chăm sóc bản thân và hoàn toàn nằm nghỉ tại giường hoặc ghế.</p>
                <p>• PS 5: Bệnh nhân tử vong.</p>
                43. Xét nghiệm sau điều trị:
                <table>
                    <thead>
                        <tr>
                            <th>Thời gian sau sử dụng hóa chất</th>
                            <th>Hồng cầu(T/L)</th>
                            <th>Hb (g/L)</th>
                            <th>Bạch cầu (G/L)</th>
                            <th>Tiểu cầu
                                (G/L)
                            </th>
                            <th>Khối u tái phát
                                <br />
                                0. Không
                                1. Có
                            </th>
                            <th>Cơ quan di căn mới*
                                <br />
                                0. Không
                                1. Có (ghi rõ)
                            </th>
                        </tr>

                    </thead>
                    <tbody>
                        {COLORECTAL.responeToTreatment.map((res, resId) => {
                            return (
                                <tr key={resId}>
                                    {res.map((ques, quesId) => {
                                        return (
                                            <td key={quesId}>
                                                <CustomInput quesId={quesId} ques={ques} COLORECTAL={COLORECTAL} templateInfo={ques} />
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <p>
                    *Cơ quan di căn mới xuất hiện trong thời gian theo dõi (bằng các phương tiện chẩn đoán hình ảnh)
                </p>
                44. CEA
                <table>
                    <thead>
                        <tr>
                            <th> Thời gian sau sử dụng đích</th>
                            <th>Nồng độ CEA (ng/ml)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {COLORECTAL.CEA.map((res, resId) => {
                            return (
                                <tr key={resId}>
                                    {res.map((ques, quesId) => {
                                        return (
                                            <td key={quesId}>
                                                <CustomInput quesId={quesId} ques={ques} COLORECTAL={COLORECTAL} templateInfo={ques} />
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {COLORECTAL.assessmentResponseTreatment.listQuestions.map((ques, quesId) => {
                    return (
                        <Row key={quesId} gutter={[16, 40]} style={{ marginTop: '8px' }}>
                            <Col span={8}> {ques?.question}</Col>
                            <Col span={16}>
                                <CustomInput quesId={quesId} ques={ques} COLORECTAL={COLORECTAL} templateInfo={ques} />
                            </Col>
                        </Row>
                    );
                })}
            </div>
            <h4>VIII{'>'} THÔNG TIN XÉT NGHIỆM DI TRUYỀN</h4>
            <Form {...formItemLayout} labelAlign="left" form={genTestForm}>
                <Form.Item name="patientId" label="Mã bệnh nhân">
                    <Input></Input>
                </Form.Item>
                <Form.Item name="specimenId" label="Mã bệnh phẩm">
                    <Input></Input>
                </Form.Item>
                <Form.Item name="testCode" label="Mã xét nghiệm">
                    <Input></Input>
                </Form.Item>
                <Form.Item name="cancerType" label="Loại ung thư">
                    <Input></Input>
                </Form.Item>
                <Form.Item name="dateSample" label="Ngày lấy mẫu">
                    <Input type="date"></Input>
                </Form.Item>
                <Form.Item name="typeSpecimen" label="Loại mẫu bệnh phẩm">
                    <Radio.Group>
                        <Radio value="Mẫu mô tươi">Mẫu mô tươi</Radio>
                        <Radio value="Mẫu mô đúc nến">Mẫu mô đúc nến</Radio>
                        <Radio value="Mẫu máu ngoại vi">Mẫu máu ngoại vi</Radio>
                        <Radio value="Dịch màng bụng/màng phổi">Dịch màng bụng/màng phổi</Radio>
                        <Radio value="DNA">DNA</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="sourceSpecimen" label="Nguồn lấy mẫu">
                    <Radio.Group>
                        <Radio value="Mô tổn thương chính">Mô tổn thương chính</Radio>
                        <Radio value="Mô tổn thương di căn">Mô tổn thương di căn</Radio>
                        <Radio value="Khác">Khác</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="statusSpecimen" label="Tình trạng mẫu khi tiếp nhận">
                    <Radio.Group>
                        <Radio value="Đạt">Đạt</Radio>
                        <Radio value="Không đạt">Không đạt</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="preserveMethodSpecimen" label="Phương pháp bảo quản mẫu">
                    <Radio.Group>
                        <Space direction="vertical">
                            <Radio value="Bảo quản nhiệt độ thường">Bảo quản nhiệt độ thường</Radio>
                            <Radio value="Bảo quản 4 độ C">Bảo quản 4 độ C</Radio>
                        </Space>
                        <Space direction="vertical">
                            <Radio value="Bảo quản -20 độ C">Bảo quản -20 độ C</Radio>
                            <Radio value="Bảo quản -80 độ C">Bảo quản -80 độ C</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="conditionalSpecimen" label="Điều kiện vận chuyển mẫu">
                    <Radio.Group>
                        <Radio value="Nhiệt độ thường">Nhiệt độ thường</Radio>
                        <Radio value="Ice bag">Ice bag</Radio>
                        <Radio value="Dry ice">Dry ice</Radio>
                    </Radio.Group>
                </Form.Item>
                <h4>46. Kết quả tách chiết DNA</h4>
                <Form.Item name="dateExtractDNA" label="Ngày thực hiện tách chiết DNA">
                    <Input type='date'></Input>
                </Form.Item>
                <Form.Item name="chemicalExtractDNA" label="Hóa chất tách chiết DNA">
                    <Input></Input>
                </Form.Item>
                <Form.Item name="concentrateDNA" label="Nồng độ DNA thu được">
                    <Input></Input>
                </Form.Item>
                <Form.Item name="purityDNA" label="Độ tinh sạch của DNA sau tách chiết">
                    <Radio.Group>
                        <Radio value="Đạt">Đạt</Radio>
                        <Radio value="Không đạt">Không đạt</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
            <h4>47. Kết quả xét nghiệm gen</h4>
            {
                COLORECTAL.genTestResult.listQuestions.map((ques, quesId) => {
                    return (
                        <Row key={quesId} gutter={[16, 40]} style={{ marginTop: '8px' }}>
                            <Col span={8}> {ques?.question}</Col>
                            <Col span={16}>
                                <CustomInput quesId={quesId} ques={ques} COLORECTAL={COLORECTAL} templateInfo={ques} />
                            </Col>
                        </Row>
                    );
                })
            }
            <h5>Kết quả</h5>
            <table>
                <thead>
                    <th >Gen</th>
                    <th>Trình tự tham chiếu</th>
                    <th>Biến thể</th>
                    <th>Vị trí trên nhiễm sắc thể</th>
                    <th>Tỉ lệ đột biến</th>
                    <th>Thuốc điều trị tương ứng</th>
                    <th>Phản ứng thuốc <br />(Đáp ứng/Không đáp ứng)</th>
                </thead>
                <tbody>
                    {COLORECTAL.genTestResult.result.map((res, resId) => {


                        return (
                            <tr key={resId}>
                                {res.map((ques, quesId) => {

                                    return (
                                        <td key={quesId}>
                                            <CustomInput quesId={quesId} ques={ques} COLORECTAL={COLORECTAL} templateInfo={ques} />
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <h5>Kết luận</h5>
            <CustomInput ques={COLORECTAL.genTestResult.conclude} COLORECTAL={COLORECTAL} templateInfo={COLORECTAL.genTestResult.conclude} />
            <Affix style={{ right: '30px', position: 'absolute' }} offsetBottom={50}>
                <Tooltip title="Save" color="#1890ff">
                    <Button size="large" type="primary" icon={<SaveOutlined />}></Button>
                </Tooltip>
            </Affix>
        </PageContainer >
    );
};