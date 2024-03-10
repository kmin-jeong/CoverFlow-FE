import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import styled from 'styled-components';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import SearchInput from '../../ui/searchInput/searchInput.jsx';
import '../../../asset/sass/pages/searchPage/searchResultPage.scss';
import { BASE_URL } from '../../global/constants/index.js';
import Plus from '../../../asset/image/plus.svg';
import Warning from '../../../asset/image/warning.svg';

const ResultsContainer = styled.div`
  position: relative;
  background-color: #ffffff;
`;

const ResultItem = styled.li`
  font-size: 18px;
  letter-spacing: -1px;
  list-style: none;
  padding: 20px 20px;
  background-color: #ffffff;
  border: 1.5px solid #eaeaea;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-bottom: 15px;

  &:hover {
    background-color: #f9f9f9;
    border-color: #d1d1d1;
    border: 2px solid cecece;
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.08),
      0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &::after {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background-color: #007bff;
    border-radius: 50%;
  }
`;

const IndustryTag = styled.span`
  color: #9b9898;
  font-size: 12px;
  margin: 10% 0% 0% -1%;
`;

const Line = styled.div`
  height: 13px;
  background-color: #f2f2f2;
  width: 103%;
  margin: 6% 0% 0% -1.5%;
`;

const ResultsList = styled.ul`
  padding: 10;
  margin-top: 8%;
  width: 80%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
`;

const ResultCount = styled.div`
  letter-spacing: -1px;
  margin: 9% 0% -3% 11%;
  color: #333;
  font-size: 14px;
  font-weight: 600;
`;

const QuestionCount = styled.div`
  font-size: 16px;
  text-align: center;
  flex-shrink: 0;
  color: #428238;
  font-weight: 600;

  &::before {
    content: '질문 수';
    display: block;
    font-size: 0.8em;
    color: #6c757d;
    margin-bottom: 10%;
    font-weight: 400;
  }

  &::after {
    content: '';
    display: block;
    height: 1px;
  }
`;

function SearchResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword');
  const [searchResult, setSearchResult] = useState([]);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${BASE_URL}/api/company/?pageNo=1&name=${keyword}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const { data } = await response.json();
        if (response.ok) {
          console.log(data);
          setSearchResult(data);
        } else {
          alert('데이터를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('데이터 요청 중 오류 발생:', error);
      }
    }

    fetchData();
  }, [location.search]);

  const goToResultDetailPage = (companyId) => {
    navigate(`/company-info/${companyId}`);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <ResultsContainer>
          <TitleHeader pageTitle="검색 결과" handleGoBack={handleGoBack} />
          <SearchInput />
          <Line />
          <ResultCount>
            기업 검색 결과{' '}
            <span className="result-count"> {searchResult.length}</span>
          </ResultCount>
          <ResultsList>
            {searchResult.length > 0 ? (
              searchResult.map((data, index) => (
                <ResultItem
                  key={data.id}
                  onClick={() => goToResultDetailPage(data.id)}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <span>{data.name}</span>
                    <IndustryTag>{data.type}</IndustryTag>
                  </div>
                  <QuestionCount>{data.questionCount}</QuestionCount>
                </ResultItem>
              ))
            ) : (
              <span className="result-data-failed">
                <img
                  className="warning-icon"
                  src={Warning}
                  alt="Warning Icon"
                />
                <div className="failed-text">검색 결과가 없습니다</div>
                <div className="failed-text2">
                  코버플로우에 원하는 기업을 등록해 주세요
                </div>

                <div className="registContainer">
                  <img className="plus-icon" src={Plus} alt="Plus Icon" />
                  <a href="/company-regist" className="company-registration">
                    기업 등록하기
                  </a>
                </div>
              </span>
            )}
          </ResultsList>
        </ResultsContainer>
        <TabBar />
      </StyledHeader>
    </StyledPage>
  );
}

export default SearchResultPage;
