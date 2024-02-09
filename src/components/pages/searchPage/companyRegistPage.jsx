import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '../../../asset/image/back.svg';
import '../../../asset/sass/pages/searchPage/companyRegistPage.scss';
import { ACCESS_TOKEN } from '../../pages/loginPage/constants/index.js';
import { StyledPage, Heading } from '../../../styledComponent.js';

function CompanyRegistPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      localStorage.setItem('companyRegistPageURL', '/company-regist');
      navigate('/login');
    }
  }, [navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container">
      <Heading>
        <img
          className="back"
          src={Back}
          onClick={handleGoBack}
          alt="뒤로 가기"
        />
        <span className="title">기업 등록</span>
      </Heading>

      <input type="text" className="input-field" placeholder="입력란 1" />
      <input type="text" className="input-field" placeholder="입력란 2" />
      <input type="text" className="input-field" placeholder="입력란 3" />
      <input type="text" className="input-field" placeholder="입력란 4" />
    </StyledPage>
  );
}

export default CompanyRegistPage;
