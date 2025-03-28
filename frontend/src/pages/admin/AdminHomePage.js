import { Container, Grid, Paper } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector(state => state.user);

    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList?.length || 0;
    const numberOfClasses = sclassesList?.length || 0;
    const numberOfTeachers = teachersList?.length || 0;

    return (
        <StyledContainer>
            <Grid container spacing={3}>
                {[
                    { title: "Total Students", image: Students, count: numberOfStudents, color: "#FF5733" },
                    { title: "Total Classes", image: Classes, count: numberOfClasses, color: "#1E88E5" },
                    { title: "Total Teachers", image: Teachers, count: numberOfTeachers, color: "#28A745" },
                    { title: "Fees Collection", image: Fees, count: 50000, color: "#FFC107", prefix: "Rs." }
                ].map((item, index) => (
                    <Grid item xs={12} md={6} lg={3} key={index}>
                        <StyledCard color={item.color}>
                            <img src={item.image} alt={item.title} className="icon" />
                            <h3>{item.title}</h3>
                            <CountUp className="count" start={0} end={item.count} duration={2.5} prefix={item.prefix || ""} />
                        </StyledCard>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <StyledNotice>
                        <SeeNotice />
                    </StyledNotice>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

const StyledContainer = styled(Container)`
    max-width: 1200px;
    margin-top: 30px;
    padding: 20px;
    background: linear-gradient(135deg, #F0F4F8, #D9E2EC);
    border-radius: 12px;
    box-shadow: 0px 5px 15px rgba(0,0,0,0.1);
`;

const StyledCard = styled(Paper)`
    padding: 20px;
    text-align: center;
    border-radius: 15px;
    box-shadow: 0px 8px 20px rgba(0,0,0,0.2);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    background: linear-gradient(135deg, ${(props) => props.color}, ${(props) => props.color + 'D9'});
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 10px 25px rgba(0,0,0,0.3);
    }
    
    .icon {
        width: 65px;
        height: 65px;
        margin-bottom: 12px;
        filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.2));
    }
    
    h3 {
        font-size: 1.3rem;
        font-weight: bold;
        margin-bottom: 8px;
        text-transform: uppercase;
    }
    
    .count {
        font-size: 1.8rem;
        font-weight: bold;
        letter-spacing: 1px;
    }
`;

const StyledNotice = styled(Paper)`
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0px 5px 15px rgba(0,0,0,0.2);
    background: linear-gradient(135deg, #F8F9FA, #E9ECEF);
`;

export default AdminHomePage;
