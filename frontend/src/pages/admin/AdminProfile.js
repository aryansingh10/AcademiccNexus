import { useSelector } from 'react-redux';
import styled from 'styled-components';

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <ProfileContainer>
            <ProfileItem>
                <Label>Name:</Label>
                <Value>{currentUser.name}</Value>
            </ProfileItem>
            <ProfileItem>
                <Label>Email:</Label>
                <Value>{currentUser.email}</Value>
            </ProfileItem>
            <ProfileItem>
                <Label>School:</Label>
                <Value>{currentUser.schoolName}</Value>
            </ProfileItem>
        </ProfileContainer>
    )
}

export default AdminProfile;

const ProfileContainer = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ProfileItem = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.span`
    font-weight: bold;
`;

const Value = styled.span`
    margin-left: 10px;
`;
