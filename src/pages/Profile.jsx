import styled from "styled-components"
import ProfileImg from "../images/profile_dummy.jpeg";


const ProfileLogo= styled.div`
    border: 2px solid blue;
    height: 250px;
    width: 250px;
    border-radius: 50%;
`;
const ProfileImage = styled.img`
      border: 2px solid blue;
    height: 250px;
    width: 250px;
    border-radius: 50%;
`;
const UserName = styled.div`
    font-size: 1.5em;
    font-weight: bolder;
    color: blue
`;
const Email = styled.div`
        font-size: 1.5em;
    font-weight: bolder;
     color: blue
`;
const ProfileTop = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    border: 2px solid aqua;
    padding :10px 0 10px 0;
    border-radius: 10px;
`;
const Details = styled.div`
      
      padding: 70px
`;

const HR = styled.div`

      width: 100%;
      height: 1px;
      background-color: ${({theme})=> theme.text_secondary};
      margin: 30px 0px;

`;
const ProfileBottom = styled.div`

    border: 2px solid aqua;
     border-radius: 10px;

`;
const Favorites = styled.p`
     font-size: 1.5em;
    font-weight: bolder;
    color: blue
`;
const ProfilePhoto = styled.div``;
const Profile = () => {
  const display = JSON.parse(localStorage.getItem("display"));
  console.log(display);
  return (
    <>
        <ProfileTop>
            <ProfilePhoto>
                <ProfileLogo>
                    <ProfileImage src={ProfileImg} />
                </ProfileLogo>
                {/* <input type="file" placeholder="upload profile photo" style={{color: 'white'}}/> */}
            </ProfilePhoto>
            <Details>
                <UserName>

                    {
                      display.username
                    }
                </UserName>
                <Email>
                    {
                      display.email
                    }
                </Email>
            </Details>
        
        </ProfileTop>
        <HR/>
        <ProfileBottom>
          <Favorites>
             Your favorites
          </Favorites>

        </ProfileBottom>
    </>
    
    
  )
}

export default Profile
