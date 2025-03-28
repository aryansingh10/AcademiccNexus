import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaSchool } from 'react-icons/fa'; // Add icons

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    if (!currentUser) {
        return <LoadingContainer>Loading...</LoadingContainer>;
    }

    return (
        <ProfileContainer>
            <ProfileItem>
                <Label><FaUser /> Name:</Label>
                <Value>{currentUser.name}</Value>
            </ProfileItem>
            <ProfileItem>
                <Label><FaEnvelope /> Email:</Label>
                <Value>{currentUser.email}</Value>
            </ProfileItem>
            <ProfileItem>
                <Label><FaSchool /> School:</Label>
                <Value>{currentUser.schoolName}</Value>
            </ProfileItem>
        </ProfileContainer>
    );
}

export default AdminProfile;

// Styled-components

const ProfileContainer = styled.div`
    background-color: #ffffff;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 20px auto;
    font-family: 'Arial', sans-serif;
`;

const ProfileItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 18px;
    line-height: 1.5;
`;

const Label = styled.span`
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;
    margin-right: 15px;
    font-size: 20px;
`;

const Value = styled.span`
    color: #555;
    font-size: 18px;
    word-wrap: break-word;
    max-width: 70%;
`;

const LoadingContainer = styled.div`
    font-size: 18px;
    color: #333;
    text-align: center;
    padding: 50px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 50px auto;
`;

