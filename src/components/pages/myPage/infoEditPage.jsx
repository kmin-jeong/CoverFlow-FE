import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/pages/myPage/infoEditPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import UserInfoHeader from '../../ui/header/userInfoHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import { BASE_URL, ACCESS_TOKEN } from '../../global/constants/index.js';

const Divider = styled.div`
  height: 1px;
  background-color: #ccc;
  width: 80%;
  margin: 10% 0% 0% 10%;
`;

const NickModifyBtn = styled.button`
  cursor: pointer;
  padding: 5px 8px;
  font-family: pretendard-light;
  border-radius: 1px;
  width: 100%;
  margin-bottom: 10%;
`;

const SecessionBtn = styled.button`
  cursor: pointer;
  padding: 5px 8px;
  font-family: pretendard-light;
  border-radius: 1px;
  margin: 2% 0% 0% 0%;
  width: 100%;
`;

function InfoEditPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ socialType: ' ' });
  const { nickname } = userInfo;

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        console.log('사용자 정보 불러오는 중...');
        const response = await fetch(`${BASE_URL}/api/member/find-member`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          try {
            const data = await response.json();
            console.log('사용자 정보 성공적으로 불러옴:', data);
            setUserInfo({
              ...userInfo,
              nickname: data.nickname,
              socialType: data.socialType,
            });
          } catch (jsonError) {
            console.error('JSON 파싱 에러:', jsonError);
          }
        } else {
          const errorMessage = await response.text();
          console.error('사용자 정보를 불러오는데 실패했습니다.', errorMessage);
        }
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };

    loadUserInfo();
  }, [nickname]);

  const renderSocialType = (type) => {
    switch (type) {
      case 'GOOGLE':
        return <div className="socialType-ui">구글 로그인 사용 중</div>;
      case 'KAKAO':
        return <div className="socialType-ui">카카오 로그인 사용 중</div>;
      case 'NAVER':
        return <div className="socialType-ui">네이버 로그인 사용 중</div>;

      default:
        return null;
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const goToSecessionPage = () => {
    navigate('/secession-page');
  };

  const handleModifyNickname = async () => {
    try {
      console.log('닉네임 변경 요청 중...');
      const response = await fetch(`${BASE_URL}/api/member/update-nickname`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
        body: JSON.stringify({
          nickname: nickname,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('닉네임이 성공적으로 변경되었습니다.');
        alert('닉네임이 성공적으로 변경되었습니다.');
      } else {
        const errorMessage = responseData.message || '닉네임 변경 실패';
        console.error('닉네임 변경 실패:', errorMessage);
        alert(`닉네임 변경 중 오류가 발생했습니다: ${errorMessage}`);
      }
    } catch (error) {
      console.error('닉네임 변경 요청 중 오류가 발생했습니다.', error);
      alert('닉네임 변경 중 예상치 못한 오류가 발생했습니다.');
    }
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="내 정보 수정" handleGoBack={handleGoBack} />
        <UserInfoHeader />

        <span className="user-nick-cover">
          <div className="user-nick-title"> {nickname} </div>님
          <div className="socialType-ui">
            {renderSocialType(userInfo.socialType)}
          </div>
        </span>

        <Divider />
        <div className="modify-nick-container">
          <div className="modify-info">
            <div className="modify-nick">닉네임 변경</div>
            <div className="modify-nick-info">
              변경 버튼을 누르면, 붕어빵 20개가 차감되며 <br /> 다른 랜덤
              닉네임으로 변경됩니다
            </div>
            <NickModifyBtn onClick={handleModifyNickname}> 변경 </NickModifyBtn>
          </div>
        </div>

        <div className="secessionPage-container">
          <div className="secessionUser-info">
            <div className="userSecession">회원 탈퇴</div>
            <div className="userSecession-info">
              회원 탈퇴를 할 경우, 계정을 되돌릴 수 없고 모든 데이터가
              삭제됩니다
            </div>
            <SecessionBtn onClick={goToSecessionPage}>탈퇴</SecessionBtn>
          </div>
        </div>
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default InfoEditPage;
