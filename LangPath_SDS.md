![langpath-usecase-diagram](https://github.com/user-attachments/assets/aab5a305-f165-4828-a447-bfb621d968ff)# Software Design Specification (SDS)

## LangPath - AI 기반 외국어 학습 컨설턴트 서비스

**Team Information:**
- Student ID: 21821469
- Name: 정창화
- E-mail: [이메일 주소]

---

## [ Revision History ]

| Revision date | Version # | Description | Author |
|--------------|-----------|-------------|---------|
| 11/07/2025 | 1.0 | Initial SDS document creation | 정창화 |

---

## = Contents =

1. Introduction
2. Use case analysis
3. Class diagram
4. Sequence diagram
5. State machine diagram
6. User interface prototype
7. Implementation requirements
8. Glossary
9. References

---

## = Authors for each section =

- Introduction – 정창화
- Use case analysis – 정창화
- Class diagram – 정창화
- Sequence diagram – 정창화
- State machine diagram – 정창화
- User interface prototype - 정창화
- Implementation requirements - 정창화
- Glossary - 정창화
- References - 정창화

---

## 1. Introduction

본 문서는 LangPath 외국어 학습 컨설턴트 서비스의 소프트웨어 설계 명세서(Software Design Specification)이다. LangPath는 AI 기반 맞춤형 학습 스케줄 생성과 진도 관리 기능을 제공하여 학습자가 목표를 달성할 수 있도록 돕는 개인 맞춤형 학습 플랫폼이다.

### 주요 설계 포인트

1. **7단계 온보딩 시스템**: 사용자의 언어, 수준, 목표, 기간, 학습시간, 방식, 약점을 체계적으로 수집하여 맞춤형 학습 계획 생성의 기반을 마련한다.

2. **AI 기반 스케줄 생성**: OpenAI API를 활용하여 사용자 프로필에 기반한 12주간의 상세한 학습 로드맵을 자동 생성한다.

3. **진도 관리 시스템**: 일일 과제 체크리스트, 연속 학습 일수 추적, 주간 캘린더를 통해 학습 동기를 유지하고 꾸준한 학습 습관 형성을 지원한다.

4. **데이터 영속성**: localStorage와 서버 데이터베이스를 결합하여 사용자 데이터의 안정적인 저장과 동기화를 보장한다.

5. **반응형 디자인**: 모바일과 데스크톱 환경 모두에서 최적화된 사용자 경험을 제공한다.

---

## 2. Use case analysis

### Use Case Diagram
[사용자]
|
|--- (1. 학습 프로필 생성)
|--- (2. AI 학습 계획 생성)
|--- (3. 오늘의 학습 조회)
|--- (4. 과제 완료 처리)
|--- (5. 전체 스케줄 조회)
|--- (6. 진행률 추적)
|--- (7. AI 챗봇 상담)
|--- (8. 프로필 관리)
|--- (9. 페이지 이동)

![Uploading l<?xml version="1.0" encoding="utf-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
  "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns:xlink="http://www.w3.org/1999/xlink" width="1000.8pt" height="1144.17875pt" viewBox="0 0 1000.8 1144.17875" xmlns="http://www.w3.org/2000/svg" version="1.1">
 <metadata>
  <rdf:RDF xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
   <cc:Work>
    <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
    <dc:date>2025-11-07T11:40:04.425617</dc:date>
    <dc:format>image/svg+xml</dc:format>
    <dc:creator>
     <cc:Agent>
      <dc:title>Matplotlib v3.10.7, https://matplotlib.org/</dc:title>
     </cc:Agent>
    </dc:creator>
   </cc:Work>
  </rdf:RDF>
 </metadata>
 <defs>
  <style type="text/css">*{stroke-linejoin: round; stroke-linecap: butt}</style>
 </defs>
 <g id="figure_1">
  <g id="patch_1">
   <path d="M 0 1144.17875 
L 1000.8 1144.17875 
L 1000.8 0 
L 0 0 
z
" style="fill: #ffffff"/>
  </g>
  <g id="axes_1">
   <g id="patch_2">
    <path d="M 183.342857 1041.20475 
L 923.142857 1041.20475 
Q 930.188571 1041.20475 930.188571 1034.36375 
L 930.188571 110.82875 
Q 930.188571 103.98775 923.142857 103.98775 
L 183.342857 103.98775 
Q 176.297143 103.98775 176.297143 110.82875 
L 176.297143 1034.36375 
Q 176.297143 1041.20475 183.342857 1041.20475 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2.5; stroke-linejoin: miter"/>
   </g>
   <g id="patch_3">
    <path d="M 91.748571 541.81175 
C 97.354207 541.81175 102.731005 539.649317 106.694788 535.800702 
C 110.658572 531.952088 112.885714 526.731513 112.885714 521.28875 
C 112.885714 515.845987 110.658572 510.625412 106.694788 506.776798 
C 102.731005 502.928183 97.354207 500.76575 91.748571 500.76575 
C 86.142936 500.76575 80.766137 502.928183 76.802354 506.776798 
C 72.838571 510.625412 70.611429 515.845987 70.611429 521.28875 
C 70.611429 526.731513 72.838571 531.952088 76.802354 535.800702 
C 80.766137 539.649317 86.142936 541.81175 91.748571 541.81175 
L 91.748571 541.81175 
z
" clip-path="url(#p27dc754731)" style="fill: none; stroke: #000000; stroke-width: 3; stroke-linejoin: miter"/>
   </g>
   <g id="patch_4">
    <path d="M 394.714286 204.8925 
C 412.465466 204.8925 429.491993 202.189459 442.043973 197.378691 
C 454.595953 192.567922 461.648571 186.042204 461.648571 179.23875 
C 461.648571 172.435296 454.595953 165.909578 442.043973 161.098809 
C 429.491993 156.288041 412.465466 153.585 394.714286 153.585 
C 376.963106 153.585 359.936578 156.288041 347.384598 161.098809 
C 334.832619 165.909578 327.78 172.435296 327.78 179.23875 
C 327.78 186.042204 334.832619 192.567922 347.384598 197.378691 
C 359.936578 202.189459 376.963106 204.8925 394.714286 204.8925 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_5">
    <path d="M 394.714286 293.8255 
C 412.465466 293.8255 429.491993 291.122459 442.043973 286.311691 
C 454.595953 281.500922 461.648571 274.975204 461.648571 268.17175 
C 461.648571 261.368296 454.595953 254.842578 442.043973 250.031809 
C 429.491993 245.221041 412.465466 242.518 394.714286 242.518 
C 376.963106 242.518 359.936578 245.221041 347.384598 250.031809 
C 334.832619 254.842578 327.78 261.368296 327.78 268.17175 
C 327.78 274.975204 334.832619 281.500922 347.384598 286.311691 
C 359.936578 291.122459 376.963106 293.8255 394.714286 293.8255 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_6">
    <path d="M 394.714286 382.7585 
C 412.465466 382.7585 429.491993 380.055459 442.043973 375.244691 
C 454.595953 370.433922 461.648571 363.908204 461.648571 357.10475 
C 461.648571 350.301296 454.595953 343.775578 442.043973 338.964809 
C 429.491993 334.154041 412.465466 331.451 394.714286 331.451 
C 376.963106 331.451 359.936578 334.154041 347.384598 338.964809 
C 334.832619 343.775578 327.78 350.301296 327.78 357.10475 
C 327.78 363.908204 334.832619 370.433922 347.384598 375.244691 
C 359.936578 380.055459 376.963106 382.7585 394.714286 382.7585 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_7">
    <path d="M 394.714286 471.6915 
C 412.465466 471.6915 429.491993 468.988459 442.043973 464.177691 
C 454.595953 459.366922 461.648571 452.841204 461.648571 446.03775 
C 461.648571 439.234296 454.595953 432.708578 442.043973 427.897809 
C 429.491993 423.087041 412.465466 420.384 394.714286 420.384 
C 376.963106 420.384 359.936578 423.087041 347.384598 427.897809 
C 334.832619 432.708578 327.78 439.234296 327.78 446.03775 
C 327.78 452.841204 334.832619 459.366922 347.384598 464.177691 
C 359.936578 468.988459 376.963106 471.6915 394.714286 471.6915 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_8">
    <path d="M 394.714286 560.6245 
C 412.465466 560.6245 429.491993 557.921459 442.043973 553.110691 
C 454.595953 548.299922 461.648571 541.774204 461.648571 534.97075 
C 461.648571 528.167296 454.595953 521.641578 442.043973 516.830809 
C 429.491993 512.020041 412.465466 509.317 394.714286 509.317 
C 376.963106 509.317 359.936578 512.020041 347.384598 516.830809 
C 334.832619 521.641578 327.78 528.167296 327.78 534.97075 
C 327.78 541.774204 334.832619 548.299922 347.384598 553.110691 
C 359.936578 557.921459 376.963106 560.6245 394.714286 560.6245 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_9">
    <path d="M 394.714286 649.5575 
C 412.465466 649.5575 429.491993 646.854459 442.043973 642.043691 
C 454.595953 637.232922 461.648571 630.707204 461.648571 623.90375 
C 461.648571 617.100296 454.595953 610.574578 442.043973 605.763809 
C 429.491993 600.953041 412.465466 598.25 394.714286 598.25 
C 376.963106 598.25 359.936578 600.953041 347.384598 605.763809 
C 334.832619 610.574578 327.78 617.100296 327.78 623.90375 
C 327.78 630.707204 334.832619 637.232922 347.384598 642.043691 
C 359.936578 646.854459 376.963106 649.5575 394.714286 649.5575 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_10">
    <path d="M 394.714286 738.4905 
C 412.465466 738.4905 429.491993 735.787459 442.043973 730.976691 
C 454.595953 726.165922 461.648571 719.640204 461.648571 712.83675 
C 461.648571 706.033296 454.595953 699.507578 442.043973 694.696809 
C 429.491993 689.886041 412.465466 687.183 394.714286 687.183 
C 376.963106 687.183 359.936578 689.886041 347.384598 694.696809 
C 334.832619 699.507578 327.78 706.033296 327.78 712.83675 
C 327.78 719.640204 334.832619 726.165922 347.384598 730.976691 
C 359.936578 735.787459 376.963106 738.4905 394.714286 738.4905 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_11">
    <path d="M 394.714286 827.4235 
C 412.465466 827.4235 429.491993 824.720459 442.043973 819.909691 
C 454.595953 815.098922 461.648571 808.573204 461.648571 801.76975 
C 461.648571 794.966296 454.595953 788.440578 442.043973 783.629809 
C 429.491993 778.819041 412.465466 776.116 394.714286 776.116 
C 376.963106 776.116 359.936578 778.819041 347.384598 783.629809 
C 334.832619 788.440578 327.78 794.966296 327.78 801.76975 
C 327.78 808.573204 334.832619 815.098922 347.384598 819.909691 
C 359.936578 824.720459 376.963106 827.4235 394.714286 827.4235 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_12">
    <path d="M 394.714286 916.3565 
C 412.465466 916.3565 429.491993 913.653459 442.043973 908.842691 
C 454.595953 904.031922 461.648571 897.506204 461.648571 890.70275 
C 461.648571 883.899296 454.595953 877.373578 442.043973 872.562809 
C 429.491993 867.752041 412.465466 865.049 394.714286 865.049 
C 376.963106 865.049 359.936578 867.752041 347.384598 872.562809 
C 334.832619 877.373578 327.78 883.899296 327.78 890.70275 
C 327.78 897.506204 334.832619 904.031922 347.384598 908.842691 
C 359.936578 913.653459 376.963106 916.3565 394.714286 916.3565 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_13">
    <path d="M 711.771429 203.18225 
C 726.719791 203.18225 741.057919 200.659412 751.628007 196.169361 
C 762.198096 191.679311 768.137143 185.58864 768.137143 179.23875 
C 768.137143 172.88886 762.198096 166.798189 751.628007 162.308139 
C 741.057919 157.818088 726.719791 155.29525 711.771429 155.29525 
C 696.823066 155.29525 682.484938 157.818088 671.91485 162.308139 
C 661.344762 166.798189 655.405714 172.88886 655.405714 179.23875 
C 655.405714 185.58864 661.344762 191.679311 671.91485 196.169361 
C 682.484938 200.659412 696.823066 203.18225 711.771429 203.18225 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_14">
    <path d="M 711.771429 271.59225 
C 725.785518 271.59225 739.227513 269.069412 749.136971 264.579361 
C 759.046429 260.089311 764.614286 253.99864 764.614286 247.64875 
C 764.614286 241.29886 759.046429 235.208189 749.136971 230.718139 
C 739.227513 226.228088 725.785518 223.70525 711.771429 223.70525 
C 697.757339 223.70525 684.315344 226.228088 674.405886 230.718139 
C 664.496428 235.208189 658.928571 241.29886 658.928571 247.64875 
C 658.928571 253.99864 664.496428 260.089311 674.405886 264.579361 
C 684.315344 269.069412 697.757339 271.59225 711.771429 271.59225 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_15">
    <path d="M 711.771429 340.00225 
C 725.785518 340.00225 739.227513 337.479412 749.136971 332.989361 
C 759.046429 328.499311 764.614286 322.40864 764.614286 316.05875 
C 764.614286 309.70886 759.046429 303.618189 749.136971 299.128139 
C 739.227513 294.638088 725.785518 292.11525 711.771429 292.11525 
C 697.757339 292.11525 684.315344 294.638088 674.405886 299.128139 
C 664.496428 303.618189 658.928571 309.70886 658.928571 316.05875 
C 658.928571 322.40864 664.496428 328.499311 674.405886 332.989361 
C 684.315344 337.479412 697.757339 340.00225 711.771429 340.00225 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_16">
    <path d="M 711.771429 408.41225 
C 725.785518 408.41225 739.227513 405.889412 749.136971 401.399361 
C 759.046429 396.909311 764.614286 390.81864 764.614286 384.46875 
C 764.614286 378.11886 759.046429 372.028189 749.136971 367.538139 
C 739.227513 363.048088 725.785518 360.52525 711.771429 360.52525 
C 697.757339 360.52525 684.315344 363.048088 674.405886 367.538139 
C 664.496428 372.028189 658.928571 378.11886 658.928571 384.46875 
C 658.928571 390.81864 664.496428 396.909311 674.405886 401.399361 
C 684.315344 405.889412 697.757339 408.41225 711.771429 408.41225 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_17">
    <path d="M 711.771429 476.82225 
C 726.719791 476.82225 741.057919 474.299412 751.628007 469.809361 
C 762.198096 465.319311 768.137143 459.22864 768.137143 452.87875 
C 768.137143 446.52886 762.198096 440.438189 751.628007 435.948139 
C 741.057919 431.458088 726.719791 428.93525 711.771429 428.93525 
C 696.823066 428.93525 682.484938 431.458088 671.91485 435.948139 
C 661.344762 440.438189 655.405714 446.52886 655.405714 452.87875 
C 655.405714 459.22864 661.344762 465.319311 671.91485 469.809361 
C 682.484938 474.299412 696.823066 476.82225 711.771429 476.82225 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_18">
    <path d="M 711.771429 545.23225 
C 726.719791 545.23225 741.057919 542.709412 751.628007 538.219361 
C 762.198096 533.729311 768.137143 527.63864 768.137143 521.28875 
C 768.137143 514.93886 762.198096 508.848189 751.628007 504.358139 
C 741.057919 499.868088 726.719791 497.34525 711.771429 497.34525 
C 696.823066 497.34525 682.484938 499.868088 671.91485 504.358139 
C 661.344762 508.848189 655.405714 514.93886 655.405714 521.28875 
C 655.405714 527.63864 661.344762 533.729311 671.91485 538.219361 
C 682.484938 542.709412 696.823066 545.23225 711.771429 545.23225 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_19">
    <path d="M 711.771429 627.32425 
C 725.785518 627.32425 739.227513 624.801412 749.136971 620.311361 
C 759.046429 615.821311 764.614286 609.73064 764.614286 603.38075 
C 764.614286 597.03086 759.046429 590.940189 749.136971 586.450139 
C 739.227513 581.960088 725.785518 579.43725 711.771429 579.43725 
C 697.757339 579.43725 684.315344 581.960088 674.405886 586.450139 
C 664.496428 590.940189 658.928571 597.03086 658.928571 603.38075 
C 658.928571 609.73064 664.496428 615.821311 674.405886 620.311361 
C 684.315344 624.801412 697.757339 627.32425 711.771429 627.32425 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_20">
    <path d="M 711.771429 695.73425 
C 726.719791 695.73425 741.057919 693.211412 751.628007 688.721361 
C 762.198096 684.231311 768.137143 678.14064 768.137143 671.79075 
C 768.137143 665.44086 762.198096 659.350189 751.628007 654.860139 
C 741.057919 650.370088 726.719791 647.84725 711.771429 647.84725 
C 696.823066 647.84725 682.484938 650.370088 671.91485 654.860139 
C 661.344762 659.350189 655.405714 665.44086 655.405714 671.79075 
C 655.405714 678.14064 661.344762 684.231311 671.91485 688.721361 
C 682.484938 693.211412 696.823066 695.73425 711.771429 695.73425 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_21">
    <path d="M 711.771429 764.14425 
C 726.719791 764.14425 741.057919 761.621412 751.628007 757.131361 
C 762.198096 752.641311 768.137143 746.55064 768.137143 740.20075 
C 768.137143 733.85086 762.198096 727.760189 751.628007 723.270139 
C 741.057919 718.780088 726.719791 716.25725 711.771429 716.25725 
C 696.823066 716.25725 682.484938 718.780088 671.91485 723.270139 
C 661.344762 727.760189 655.405714 733.85086 655.405714 740.20075 
C 655.405714 746.55064 661.344762 752.641311 671.91485 757.131361 
C 682.484938 761.621412 696.823066 764.14425 711.771429 764.14425 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_22">
    <path d="M 711.771429 832.55425 
C 725.785518 832.55425 739.227513 830.031412 749.136971 825.541361 
C 759.046429 821.051311 764.614286 814.96064 764.614286 808.61075 
C 764.614286 802.26086 759.046429 796.170189 749.136971 791.680139 
C 739.227513 787.190088 725.785518 784.66725 711.771429 784.66725 
C 697.757339 784.66725 684.315344 787.190088 674.405886 791.680139 
C 664.496428 796.170189 658.928571 802.26086 658.928571 808.61075 
C 658.928571 814.96064 664.496428 821.051311 674.405886 825.541361 
C 684.315344 830.031412 697.757339 832.55425 711.771429 832.55425 
z
" clip-path="url(#p27dc754731)" style="fill: #ffffff; stroke: #000000; stroke-width: 2; stroke-linejoin: miter"/>
   </g>
   <g id="patch_23">
    <path d="M 328.794003 180.962153 
Q 353.446318 223.70598 330.189641 264.02858 
" clip-path="url(#p27dc754731)" style="fill: none; stroke-dasharray: 2.5,4.125; stroke-dashoffset: 0; stroke: #ff0000; stroke-width: 2.5; stroke-linecap: round"/>
    <path d="M 339.517064 257.864232 
L 330.189641 264.02858 
L 330.854617 252.868033 
" clip-path="url(#p27dc754731)" style="fill: none; stroke-dasharray: 2.5,4.125; stroke-dashoffset: 0; stroke: #ff0000; stroke-width: 2.5; stroke-linecap: round"/>
   </g>
   <g id="patch_24">
    <path d="M 326.752667 800.052793 
Q 142.048033 490.504251 325.320453 183.355971 
" clip-path="url(#p27dc754731)" style="fill: none; stroke-dasharray: 2.5,4.125; stroke-dashoffset: 0; stroke: #ff0000; stroke-width: 2.5; stroke-linecap: round"/>
    <path d="M 315.902687 189.381391 
L 325.320453 183.355971 
L 324.49013 194.505436 
" clip-path="url(#p27dc754731)" style="fill: none; stroke-dasharray: 2.5,4.125; stroke-dashoffset: 0; stroke: #ff0000; stroke-width: 2.5; stroke-linecap: round"/>
   </g>
   <g id="line2d_1">
    <path d="M 91.748571 541.81175 
L 91.748571 589.69875 
" clip-path="url(#p27dc754731)" style="fill: none; stroke: #000000; stroke-width: 3; stroke-linecap: square"/>
   </g>
   <g id="line2d_2">
    <path d="M 70.611429 555.49375 
L 112.885714 555.49375 
" clip-path="url(#p27dc754731)" style="fill: none; stroke: #000000; stroke-width: 3; stroke-linecap: square"/>
   </g>
   <g id="line2d_3">
    <path d="M 91.748571 589.69875 
L 70.611429 623.90375 
" clip-path="url(#p27dc754731)" style="fill: none; stroke: #000000; stroke-width: 3; stroke-linecap: square"/>
   </g>
   <g id="line2d_4">
    <path d="M 91.748571 589.69875 
L 112.885714 623.90375 
" clip-path="url(#p27dc754731)" style="fill: none; stroke: #000000; stroke-width: 3; stroke-linecap: square"/>
   </g>
   <g id="line2d_5">
    <path d="M 112.885714 555.49375 
L 327.78 179.23875 
" clip-path="url(#p27dc754731)" style="fill: none; stroke: #000000; stroke-opacity: 0.7; stroke-width: 1.3; stroke-linecap: square"/>
   </g>
   <g id="line2d_6">
    <path d="M 112.885714 555.49375 
L 327.78 268.17175 
" clip-path="url(#p27dc754731)" style="fill: none; stroke: #000000; stroke-opacity: 0.7; stroke-width: 1.3; stroke-linecap: square"/>
   </g>
   <g id="line2d_7">
    <path d="M 112.885714 555.49375 
L 327.78 357.10475 
" clip-path="url(#p27dc754731)" style="fill: none; stroke: #000000; stroke-opacity: 0.7; stroke-width: 1.3; stroke-linecap: square"/>
   </g>
   <g id="line2d_8">
    <path d="M 112.885714 555.49375 
L 327.78 446.03775 
" clip-path="url(#p27dc754731)" style="fill: none; stroke: #000000; stroke-opacity: 0.7; stroke-width: 1.3; stroke-linecap: square"/>
   </g>
   <g id="line2d_9">
    <path d="M 112.885714 555.49375 
L 327.78 534.97075 
" clip-path="url(#p27dc754731)" style="fill: none; stroke: #000000; stroke-opacity: 0.7; stroke-width: 1.3; stroke-linecap: square"/>
   </g>
   <g id="line2d_10">
    <path d="M 112.885714 555.49375 
L 327.78 623.90375 
" clip-path="url(#p27dc754731)" style="fill: none; stroke: #000000; stroke-opacity: 0.7; stroke-width: 1.3; stroke-linecap: square"/>
   </g>
   <g id="line2d_11">
    <path d="M 112.885714 555.49375 
L 327.78 712.83675 
" clip-path="url(#p27dc754731)" style="fill: none; stroke: #000000; stroke-opacity: 0.7; stroke-width: 1.3; stroke-linecap: square"/>
   </g>
   <g id="line2d_12">
    <path d="M 112.885714 555.49375 
L 327.78 801.76975 
" clip-path="url(#p27dc754731)" style="fill: none; stroke: #000000; stroke-opacity: 0.7; stroke-width: 1.3; stroke-linecap: square"/>
   </g>
   <g id="line2d_13">
    <path d="M 112.885714 555.49375 
L 327.78 890.70275 
" clip-path="url(#p27dc754731)" style="fill: none; stroke: #000000; stroke-opacity: 0.7; stroke-width: 1.3; stroke-linecap: square"/>
   </g>
   <g id="text_1">
    <text style="font-weight: 700; font-size: 18px; font-family: 'NanumGothic'; text-anchor: middle" x="553.242857" y="124.51075" transform="rotate(-0 553.242857 124.51075)">LangPath System</text>
   </g>
   <g id="text_2">
    <text style="font-weight: 700; font-size: 12px; font-family: 'NanumGothic'" transform="translate(74.828571 651.351875)">학습자</text>
    <text style="font-weight: 700; font-size: 12px; font-family: 'NanumGothic'" transform="translate(72.135134 664.94975)">(Actor)</text>
   </g>
   <g id="text_3">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(360.785301 176.179375)">1. 학습 프로필</text>
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(384.374286 188.446094)">생성</text>
   </g>
   <g id="text_4">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(359.085458 265.112375)">2. AI 학습 계획</text>
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(384.374286 277.379094)">생성</text>
   </g>
   <g id="text_5">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(360.785301 354.045375)">3. 오늘의 학습</text>
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(384.374286 366.312094)">조회</text>
   </g>
   <g id="text_6">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(365.955301 442.978375)">4. 과제 완료</text>
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(384.374286 455.245094)">처리</text>
   </g>
   <g id="text_7">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(360.785301 531.911375)">5. 전체 스케줄</text>
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(384.374286 544.178094)">조회</text>
   </g>
   <g id="text_8">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(372.665301 620.844375)">6. 진행률</text>
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(384.374286 633.111094)">추적</text>
   </g>
   <g id="text_9">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(370.965458 709.777375)">7. AI 챗봇</text>
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(384.374286 722.044094)">상담</text>
   </g>
   <g id="text_10">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(372.665301 798.710375)">8. 프로필</text>
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(384.374286 810.977094)">관리</text>
   </g>
   <g id="text_11">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(372.665301 887.643375)">9. 페이지</text>
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(384.374286 899.910094)">이동</text>
   </g>
   <g id="text_12">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(686.218772 176.179375)">7단계 질문</text>
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(701.431429 188.446094)">진행</text>
   </g>
   <g id="text_13">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'; text-anchor: middle" x="711.771429" y="250.722734" transform="rotate(-0 711.771429 250.722734)">입력 검증</text>
   </g>
   <g id="text_14">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'; text-anchor: middle" x="711.771429" y="319.132734" transform="rotate(-0 711.771429 319.132734)">프로필 저장</text>
   </g>
   <g id="text_15">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(692.4501 381.409375)">OpenAI</text>
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(691.387913 393.676094)">API 호출</text>
   </g>
   <g id="text_16">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(682.886116 449.819375)">12주 스케줄</text>
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(701.431429 462.086094)">생성</text>
   </g>
   <g id="text_17">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(696.261429 518.229375)">언어별</text>
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(680.751429 530.496094)">커스터마이징</text>
   </g>
   <g id="text_18">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(689.551429 600.321375)">일일 완료</text>
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(701.431429 612.588094)">처리</text>
   </g>
   <g id="text_19">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(689.551429 668.731375)">연속 학습</text>
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(689.551429 680.998094)">일수 계산</text>
   </g>
   <g id="text_20">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(684.381429 737.141375)">주간 진행률</text>
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'" transform="translate(701.431429 749.408094)">계산</text>
   </g>
   <g id="text_21">
    <text style="font-weight: 700; font-size: 11px; font-family: 'NanumGothic'; text-anchor: middle" x="711.771429" y="811.684734" transform="rotate(-0 711.771429 811.684734)">업적 시스템</text>
   </g>
   <g id="patch_25">
    <path d="M 463.650122 179.23875 
Q 558.528703 179.23875 651.730234 179.23875 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #000000; stroke-width: 1.5; stroke-linecap: round"/>
    <path d="M 647.730234 177.23875 
L 651.730234 179.23875 
L 647.730234 181.23875 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #000000; stroke-width: 1.5; stroke-linecap: round"/>
   </g>
   <g id="text_22">
    <text style="font-style: italic; font-size: 9px; font-family: 'NanumGothic'; text-anchor: middle" x="558.527143" y="162.13625" transform="rotate(-0 558.527143 162.13625)">&lt;&lt;include&gt;&gt;</text>
   </g>
   <g id="patch_26">
    <path d="M 463.531862 179.903685 
Q 558.524584 213.442847 651.935929 246.42367 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #000000; stroke-width: 1.5; stroke-linecap: round"/>
    <path d="M 648.829979 243.206051 
L 651.935929 246.42367 
L 647.498263 246.977858 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #000000; stroke-width: 1.5; stroke-linecap: round"/>
   </g>
   <g id="text_23">
    <text style="font-style: italic; font-size: 9px; font-family: 'NanumGothic'; text-anchor: middle" x="558.527143" y="196.34125" transform="rotate(-0 558.527143 196.34125)">&lt;&lt;include&gt;&gt;</text>
   </g>
   <g id="patch_27">
    <path d="M 463.283516 180.393252 
Q 558.528178 247.649481 652.40291 313.938345 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #000000; stroke-width: 1.5; stroke-linecap: round"/>
    <path d="M 650.289087 309.997311 
L 652.40291 313.938345 
L 647.981789 313.264783 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #000000; stroke-width: 1.5; stroke-linecap: round"/>
   </g>
   <g id="text_24">
    <text style="font-style: italic; font-size: 9px; font-family: 'NanumGothic'; text-anchor: middle" x="558.527143" y="230.54625" transform="rotate(-0 558.527143 230.54625)">&lt;&lt;include&gt;&gt;</text>
   </g>
   <g id="patch_28">
    <path d="M 463.366298 269.202764 
Q 558.528896 326.321303 652.253576 382.576772 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #000000; stroke-width: 1.5; stroke-linecap: round"/>
    <path d="M 649.853207 378.803414 
L 652.253576 382.576772 
L 647.794668 382.233052 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #000000; stroke-width: 1.5; stroke-linecap: round"/>
   </g>
   <g id="text_25">
    <text style="font-style: italic; font-size: 9px; font-family: 'NanumGothic'; text-anchor: middle" x="558.527143" y="309.21775" transform="rotate(-0 558.527143 309.21775)">&lt;&lt;include&gt;&gt;</text>
   </g>
   <g id="patch_29">
    <path d="M 463.0943 269.54995 
Q 558.526668 360.524797 652.745171 450.342478 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #000000; stroke-width: 1.5; stroke-linecap: round"/>
    <path d="M 651.229938 446.134858 
L 652.745171 450.342478 
L 648.469935 449.030093 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #000000; stroke-width: 1.5; stroke-linecap: round"/>
   </g>
   <g id="text_26">
    <text style="font-style: italic; font-size: 9px; font-family: 'NanumGothic'; text-anchor: middle" x="558.527143" y="343.42275" transform="rotate(-0 558.527143 343.42275)">&lt;&lt;include&gt;&gt;</text>
   </g>
   <g id="patch_30">
    <path d="M 463.200734 447.298203 
Q 558.527494 524.709535 652.552394 601.063674 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #000000; stroke-width: 1.5; stroke-linecap: round"/>
    <path d="M 650.70805 596.989561 
L 652.552394 601.063674 
L 648.186497 600.094681 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #000000; stroke-width: 1.5; stroke-linecap: round"/>
   </g>
   <g id="text_27">
    <text style="font-style: italic; font-size: 9px; font-family: 'NanumGothic'; text-anchor: middle" x="558.527143" y="507.60675" transform="rotate(-0 558.527143 507.60675)">&lt;&lt;include&gt;&gt;</text>
   </g>
   <g id="patch_31">
    <path d="M 463.366298 624.934764 
Q 558.528896 682.053303 652.253576 738.308772 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #000000; stroke-width: 1.5; stroke-linecap: round"/>
    <path d="M 649.853207 734.535414 
L 652.253576 738.308772 
L 647.794668 737.965052 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #000000; stroke-width: 1.5; stroke-linecap: round"/>
   </g>
   <g id="text_28">
    <text style="font-style: italic; font-size: 9px; font-family: 'NanumGothic'; text-anchor: middle" x="558.527143" y="664.94975" transform="rotate(-0 558.527143 664.94975)">&lt;&lt;include&gt;&gt;</text>
   </g>
   <g id="patch_32">
    <path d="M 654.190593 519.701362 
Q 558.526271 394.72911 463.881327 271.088537 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #0000ff; stroke-width: 1.5; stroke-linecap: round"/>
    <path d="M 464.724569 275.480455 
L 463.881327 271.088537 
L 467.900807 273.049095 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #0000ff; stroke-width: 1.5; stroke-linecap: round"/>
   </g>
   <g id="text_29">
    <text style="font-style: italic; font-size: 9px; font-family: 'NanumGothic'; text-anchor: middle; fill: #0000ff" x="558.527143" y="411.83275" transform="rotate(-0 558.527143 411.83275)">&lt;&lt;extend&gt;&gt;</text>
   </g>
   <g id="patch_33">
    <path d="M 654.101898 670.27163 
Q 558.525693 558.91256 464.041725 448.826094 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #0000ff; stroke-width: 1.5; stroke-linecap: round"/>
    <path d="M 465.129196 453.163997 
L 464.041725 448.826094 
L 468.16453 450.558859 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #0000ff; stroke-width: 1.5; stroke-linecap: round"/>
   </g>
   <g id="text_30">
    <text style="font-style: italic; font-size: 9px; font-family: 'NanumGothic'; text-anchor: middle; fill: #0000ff" x="558.527143" y="576.01675" transform="rotate(-0 558.527143 576.01675)">&lt;&lt;extend&gt;&gt;</text>
   </g>
   <g id="patch_34">
    <path d="M 653.959986 807.23255 
Q 558.527618 716.257703 464.309114 626.440022 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #0000ff; stroke-width: 1.5; stroke-linecap: round"/>
    <path d="M 465.824348 630.647642 
L 464.309114 626.440022 
L 468.584351 627.752407 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #0000ff; stroke-width: 1.5; stroke-linecap: round"/>
   </g>
   <g id="text_31">
    <text style="font-style: italic; font-size: 9px; font-family: 'NanumGothic'; text-anchor: middle; fill: #0000ff" x="558.527143" y="733.35975" transform="rotate(-0 558.527143 733.35975)">&lt;&lt;extend&gt;&gt;</text>
   </g>
   <g id="text_32">
    <text style="font-style: italic; font-size: 9px; font-family: 'NanumGothic'; fill: #ff0000" transform="translate(263.370636 225.486969) rotate(-90)">&lt;&lt;trigger&gt;&gt;</text>
   </g>
   <g id="text_33">
    <text style="font-style: italic; font-size: 9px; font-family: 'NanumGothic'; fill: #ff0000" transform="translate(263.370636 492.285969) rotate(-90)">&lt;&lt;trigger&gt;&gt;</text>
   </g>
   <g id="text_34">
    <text style="font-weight: 700; font-size: 20px; font-family: 'NanumGothic'; text-anchor: middle" x="500.4" y="22.41875" transform="rotate(-0 500.4 22.41875)">LangPath Use Case Diagram</text>
   </g>
   <g id="legend_1">
    <g id="patch_35">
     <path d="M 837.235 1131.47875 
L 985.9 1131.47875 
Q 988.1 1131.47875 988.1 1129.27875 
L 988.1 1066.19375 
Q 988.1 1063.99375 985.9 1063.99375 
L 837.235 1063.99375 
Q 835.035 1063.99375 835.035 1066.19375 
L 835.035 1129.27875 
Q 835.035 1131.47875 837.235 1131.47875 
z
" style="fill: #ffffff; opacity: 0.8; stroke: #cccccc; stroke-linejoin: miter"/>
    </g>
    <g id="line2d_14">
     <path d="M 839.435 1072.938125 
L 850.435 1072.938125 
L 861.435 1072.938125 
" style="fill: none; stroke: #000000; stroke-width: 1.8; stroke-linecap: square"/>
    </g>
    <g id="text_35">
     <text style="font-size: 11px; font-family: 'NanumGothic'; text-anchor: start" x="870.235" y="1076.788125" transform="rotate(-0 870.235 1076.788125)">연관 관계 (Association)</text>
    </g>
    <g id="line2d_15">
     <path d="M 839.435 1088.865781 
L 850.435 1088.865781 
L 861.435 1088.865781 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #000000; stroke-width: 1.5"/>
    </g>
    <g id="text_36">
     <text style="font-size: 11px; font-family: 'NanumGothic'; text-anchor: start" x="870.235" y="1092.715781" transform="rotate(-0 870.235 1092.715781)">&lt;&lt;include&gt;&gt; 관계</text>
    </g>
    <g id="line2d_16">
     <path d="M 839.435 1104.793437 
L 850.435 1104.793437 
L 861.435 1104.793437 
" style="fill: none; stroke-dasharray: 5.55,2.4; stroke-dashoffset: 0; stroke: #0000ff; stroke-width: 1.5"/>
    </g>
    <g id="text_37">
     <text style="font-size: 11px; font-family: 'NanumGothic'; text-anchor: start" x="870.235" y="1108.643437" transform="rotate(-0 870.235 1108.643437)">&lt;&lt;extend&gt;&gt; 관계</text>
    </g>
    <g id="line2d_17">
     <path d="M 839.435 1121.051094 
L 850.435 1121.051094 
L 861.435 1121.051094 
" style="fill: none; stroke-dasharray: 2.5,4.125; stroke-dashoffset: 0; stroke: #ff0000; stroke-width: 2.5"/>
    </g>
    <g id="text_38">
     <text style="font-size: 11px; font-family: 'NanumGothic'; text-anchor: start" x="870.235" y="1124.901094" transform="rotate(-0 870.235 1124.901094)">&lt;&lt;trigger&gt;&gt; 관계</text>
    </g>
   </g>
  </g>
 </g>
 <defs>
  <clipPath id="p27dc754731">
   <rect x="7.2" y="42.41875" width="986.4" height="1094.56"/>
  </clipPath>
 </defs>
</svg>
angpath-usecase-diagram.svg…]()


---

### Use case #1: 학습 프로필 생성

**GENERAL CHARACTERISTICS**

| 항목 | 내용 |
|-----|------|
| Summary | 사용자가 7단계 질문을 통해 맞춤형 학습 프로필을 생성한다 |
| Scope | LangPath - AI 기반 외국어 학습 컨설턴트 서비스 |
| Level | User level |
| Author | 정창화 |
| Last Update | 2025.11.07 |
| Status | Analysis (Finalize) |
| Primary Actor | 학습자 |
| Preconditions | 사용자가 LangPath 애플리케이션에 접속한 상태여야 한다 |
| Trigger | 사용자가 처음 LangPath를 사용하거나 학습 계획 재생성을 선택할 때 |
| Success Post Condition | 사용자의 학습 프로필이 생성되고 AI 학습 계획 생성이 시작된다 |
| Failed Post Condition | 프로필 생성이 실패하고 사용자는 온보딩 단계에 머무른다 |

**MAIN SUCCESS SCENARIO**

| Step | Action |
|------|--------|
| S | 사용자가 학습 프로필을 생성한다 |
| 1 | 이 Use case는 사용자가 온보딩을 시작할 때 시작된다 |
| 2 | 사용자는 학습하고자 하는 언어를 선택한다 (일본어, 영어, 중국어, 스페인어, 프랑스어, 기타) |
| 3 | 사용자는 현재 언어 수준을 선택한다 (완전 초보, 기본 문자 읽기 가능, 간단한 회화 가능, 중급) |
| 4 | 사용자는 학습 목표를 선택한다 (여행 회화, 업무 활용, 시험 합격, 원서/영상 이해) |
| 5 | 사용자는 목표 달성 기간을 선택한다 (1개월, 3개월, 6개월, 천천히) |
| 6 | 사용자는 하루 학습 가능 시간을 선택한다 (30분, 1시간, 2시간 이상) |
| 7 | 사용자는 선호하는 학습 방식을 선택한다 (문법 중심, 회화 중심, 듣기/독해 중심, 골고루) |
| 8 | 사용자는 가장 약한 부분을 선택한다 (듣기, 말하기, 읽기, 쓰기) |
| 9 | 시스템은 입력된 정보를 검증하고 저장한다 |
| 10 | 이 Use case는 프로필 생성이 완료되면 끝난다 |

**EXTENSION SCENARIOS**

| Step | Branching Action |
|------|------------------|
| 2-8 | a. 사용자가 필수 항목을 선택하지 않은 경우<br>...a1. "다음" 버튼이 비활성화된다<br>...a2. 해당 항목을 선택할 때까지 다음 단계로 진행할 수 없다 |
| 9 | b. 데이터 저장에 실패한 경우<br>...b1. 에러 메시지를 표시한다<br>...b2. 사용자에게 다시 시도하도록 안내한다 |

**RELATED INFORMATION**

| 항목 | 내용 |
|-----|------|
| Performance | ≤ 1 second per step |
| Frequency | 사용자당 평균 1-2회 (초기 생성 및 재생성) |
| Concurrency | 제한 없음 |
| Due Date | 2025.11.15 |

---

### Use case #2: AI 학습 계획 생성

**GENERAL CHARACTERISTICS**

| 항목 | 내용 |
|-----|------|
| Summary | OpenAI를 활용하여 사용자 맞춤형 12주 학습 스케줄을 생성한다 |
| Scope | LangPath - AI 기반 외국어 학습 컨설턴트 서비스 |
| Level | System level |
| Author | 정창화 |
| Last Update | 2025.11.07 |
| Status | Analysis (Finalize) |
| Primary Actor | 시스템 (OpenAI API) |
| Preconditions | 사용자의 학습 프로필이 완성된 상태여야 한다 |
| Trigger | 학습 프로필 생성이 완료되었을 때 |
| Success Post Condition | 12주간의 학습 계획이 생성되고 대시보드로 이동한다 |
| Failed Post Condition | AI 생성에 실패하고 개발용 mock 데이터를 제공한다 |

**MAIN SUCCESS SCENARIO**

| Step | Action |
|------|--------|
| S | 시스템이 AI 학습 계획을 생성한다 |
| 1 | 이 Use case는 학습 프로필 생성이 완료될 때 시작된다 |
| 2 | 시스템은 로딩 화면과 진행률 표시를 나타낸다 |
| 3 | 시스템은 사용자 프로필 정보를 기반으로 AI 프롬프트를 생성한다 |
| 4 | 시스템은 OpenAI API를 호출하여 12주간의 학습 계획을 생성한다 |
| 5 | 각 주차는 주간 목표와 일일 학습 과제로 구성된다 |
| 6 | 선택한 언어에 따라 특화된 학습 내용이 포함된다 |
| 7 | 생성된 학습 계획은 데이터베이스에 저장된다 |
| 8 | 시스템은 자동으로 대시보드로 이동한다 |
| 9 | 이 Use case는 대시보드 진입 시 끝난다 |

**EXTENSION SCENARIOS**

| Step | Branching Action |
|------|------------------|
| 4 | a. API 호출이 실패한 경우<br>...a1. retry 로직이 작동한다 (최대 3회)<br>...a2. 3회 실패 후에도 생성되지 않으면 개발용 mock 데이터를 제공한다<br>...a3. 사용자에게 "AI 생성에 실패하여 샘플 데이터를 제공합니다" 메시지를 표시한다 |
| 4 | b. API 응답 시간이 30초를 초과하는 경우<br>...b1. timeout 에러를 발생시킨다<br>...b2. retry 로직으로 이동한다 |

**RELATED INFORMATION**

| 항목 | 내용 |
|-----|------|
| Performance | ≤ 30 seconds |
| Frequency | 사용자당 평균 1-2회 |
| Concurrency | 동시 처리 가능 (API rate limit 내) |
| Due Date | 2025.11.15 |

---

### Use case #3: 과제 완료 처리

**GENERAL CHARACTERISTICS**

| 항목 | 내용 |
|-----|------|
| Summary | 사용자가 일일 과제를 완료 표시하고 진도를 저장한다 |
| Scope | LangPath - AI 기반 외국어 학습 컨설턴트 서비스 |
| Level | User level |
| Author | 정창화 |
| Last Update | 2025.11.07 |
| Status | Analysis (Finalize) |
| Primary Actor | 학습자 |
| Preconditions | 학습 계획이 생성되어 있어야 한다 |
| Trigger | 사용자가 과제 체크박스를 클릭할 때 |
| Success Post Condition | 과제 완료 상태가 저장되고 UI가 업데이트된다 |
| Failed Post Condition | 완료 상태가 저장되지 않고 이전 상태를 유지한다 |

**MAIN SUCCESS SCENARIO**

| Step | Action |
|------|--------|
| S | 사용자가 과제를 완료 처리한다 |
| 1 | 이 Use case는 사용자가 과제 체크박스를 클릭할 때 시작된다 |
| 2 | 시스템은 과제 완료 상태를 토글한다 (완료 ↔ 미완료) |
| 3 | 완료된 과제는 시각적으로 구분된다 (줄 그어짐, 회색 처리) |
| 4 | 시스템은 과제 완료 상태를 즉시 데이터베이스에 저장한다 |
| 5 | 하루의 모든 과제를 완료한 경우 자동으로 일일 완료 처리된다 |
| 6 | 일일 완료 시 해당 날짜가 완료 날짜 목록에 추가된다 |
| 7 | 연속 학습 일수가 1 증가한다 |
| 8 | 이 Use case는 저장이 완료되면 끝난다 |

**EXTENSION SCENARIOS**

| Step | Branching Action |
|------|------------------|
| 4 | a. 데이터베이스 저장에 실패한 경우<br>...a1. 로컬 스토리지에 임시 저장한다<br>...a2. 네트워크 연결 복구 시 자동으로 동기화를 시도한다 |
| 5 | b. 완료된 과제를 언체크하는 경우<br>...b1. 일일 완료 상태가 해제된다<br>...b2. 완료 날짜 목록에서 제거된다 (당일인 경우) |

**RELATED INFORMATION**

| 항목 | 내용 |
|-----|------|
| Performance | ≤ 500ms |
| Frequency | 사용자당 하루 평균 2-5회 |
| Concurrency | 제한 없음 |
| Due Date | 2025.11.15 |

---

## 3. Class diagram

### 주요 클래스 다이어그램
┌─────────────────────┐ │ UserProfile │ ├─────────────────────┤ │ - id: string │ │ - language: string │ │ - level: string │ │ - goal: string │ │ - duration: string │ │ - dailyTime: string │ │ - studyMethod: string│ │ - weakness: string │ │ - startDate: Date │ ├─────────────────────┤ │ + createProfile() │ │ + updateProfile() │ │ + getProfile() │ └─────────────────────┘ │ │ 1:1 ▼ ┌─────────────────────┐ │ LearningSchedule │ ├─────────────────────┤ │ - userId: string │ │ - weeks: Week[] │ ├─────────────────────┤ │ + generateSchedule()│ │ + getWeek(number) │ │ + getAllWeeks() │ └─────────────────────┘ │ │ 1:N ▼ ┌─────────────────────┐ │ Week │ ├─────────────────────┤ │ - weekNumber: number│ │ - theme: string │ │ - days: DailyTask[] │ ├─────────────────────┤ │ + getTasks() │ │ + getProgress() │ └─────────────────────┘ │ │ 1:N ▼ ┌─────────────────────┐ │ DailyTask │ ├─────────────────────┤ │ - day: string │ │ - tasks: Task[] │ ├─────────────────────┤ │ + addTask() │ │ + removeTask() │ │ + getTasks() │ └─────────────────────┘ │ │ 1:N ▼ ┌─────────────────────┐ │ Task │ ├─────────────────────┤ │ - id: string │ │ - title: string │ │ - details: string[] │ │ - duration: string │ │ - completed: boolean│ ├─────────────────────┤ │ + toggleComplete() │ │ + isCompleted() │ └─────────────────────┘

┌─────────────────────┐
│   UserProgress      │
├─────────────────────┤
│ - userId: string    │
│ - completedDates: Date[]│
│ - completedTasks: string[]│
│ - currentStreak: number│
├─────────────────────┤
│ + updateProgress()  │
│ + calculateStreak() │
│ + getWeeklyProgress()│
└─────────────────────┘



### 클래스 상세 설명

#### 1. UserProfile

| 속성 | 타입 | 설명 |
|-----|------|------|
| id | string | 사용자 고유 식별자 |
| language | string | 학습 언어 (일본어, 영어 등) |
| level | string | 현재 수준 |
| goal | string | 학습 목표 |
| duration | string | 목표 기간 |
| dailyTime | string | 일일 학습 시간 |
| studyMethod | string | 학습 방식 |
| weakness | string | 약점 |
| startDate | Date | 학습 시작일 |

| 메서드 | 반환 타입 | 설명 |
|-------|----------|------|
| createProfile() | void | 새로운 프로필 생성 |
| updateProfile() | void | 프로필 정보 수정 |
| getProfile() | UserProfile | 프로필 정보 조회 |

#### 2. LearningSchedule

| 속성 | 타입 | 설명 |
|-----|------|------|
| userId | string | 사용자 ID |
| weeks | Week[] | 12주 스케줄 배열 |

| 메서드 | 반환 타입 | 설명 |
|-------|----------|------|
| generateSchedule() | void | AI를 통한 스케줄 생성 |
| getWeek(number) | Week | 특정 주차 조회 |
| getAllWeeks() | Week[] | 전체 주차 조회 |

#### 3. Week

| 속성 | 타입 | 설명 |
|-----|------|------|
| weekNumber | number | 주차 번호 (1-12) |
| theme | string | 주간 목표 |
| days | DailyTask[] | 일일 과제 배열 |

| 메서드 | 반환 타입 | 설명 |
|-------|----------|------|
| getTasks() | Task[] | 해당 주의 모든 과제 조회 |
| getProgress() | number | 주간 진행률 계산 |

#### 4. DailyTask

| 속성 | 타입 | 설명 |
|-----|------|------|
| day | string | 요일 |
| tasks | Task[] | 과제 목록 |

| 메서드 | 반환 타입 | 설명 |
|-------|----------|------|
| addTask() | void | 과제 추가 |
| removeTask() | void | 과제 삭제 |
| getTasks() | Task[] | 과제 목록 조회 |

#### 5. Task

| 속성 | 타입 | 설명 |
|-----|------|------|
| id | string | 과제 고유 ID |
| title | string | 과제 제목 |
| details | string[] | 상세 내용 |
| duration | string | 예상 소요 시간 |
| completed | boolean | 완료 여부 |

| 메서드 | 반환 타입 | 설명 |
|-------|----------|------|
| toggleComplete() | void | 완료 상태 토글 |
| isCompleted() | boolean | 완료 여부 확인 |

#### 6. UserProgress

| 속성 | 타입 | 설명 |
|-----|------|------|
| userId | string | 사용자 ID |
| completedDates | Date[] | 완료한 날짜 목록 |
| completedTasks | string[] | 완료한 과제 ID 목록 |
| currentStreak | number | 연속 학습 일수 |

| 메서드 | 반환 타입 | 설명 |
|-------|----------|------|
| updateProgress() | void | 진행률 업데이트 |
| calculateStreak() | number | 연속 일수 계산 |
| getWeeklyProgress() | object | 주간 진행 상황 조회 |

---

## 4. Sequence diagram

### 4.1 학습 프로필 생성 및 AI 스케줄 생성 Sequence Diagram
사용자    →  OnboardingPage  →  ProfileService  →  AIService  →  Database
│              │                    │                 │            │
│─ 온보딩 시작 ─→│                    │                 │            │
│              │                    │                 │            │
│← 첫 번째 질문 ─│                    │                 │            │
│              │                    │                 │            │
│─ 답변 입력 ──→│                    │                 │            │
│              │─ 답변 검증 ────────→│                 │            │
│              │←─ 검증 완료 ────────│                 │            │
│              │                    │                 │            │
│← 다음 질문 ───│                    │                 │            │
│              │                    │                 │            │
│─ (7단계 반복)→│                    │                 │            │
│              │                    │                 │            │
│              │─ 프로필 저장 ──────→│                 │            │
│              │                    │─ DB 저장 ──────→│            │
│              │                    │←─ 저장 완료 ────│            │
│              │←─ 저장 성공 ────────│                 │            │
│              │                    │                 │            │
│← 로딩 화면 ───│                    │                 │            │
│              │                    │                 │            │
│              │─ AI 생성 요청 ────→│                 │            │
│              │                    │─ OpenAI API 호출 →│           │
│              │                    │                 │            │
│              │                    │←─ 학습 계획 응답 ─│           │
│              │                    │                 │            │
│              │                    │─ 스케줄 저장 ──────────────→│
│              │                    │←─ 저장 완료 ────────────────│
│              │←─ 생성 완료 ────────│                 │            │
│              │                    │                 │            │
│← 대시보드 이동 │                    │                 │            │



**설명:**
1. 사용자가 온보딩을 시작하면 7단계 질문이 순차적으로 제시된다
2. 각 답변은 ProfileService에서 검증된다
3. 모든 질문 완료 후 프로필이 Database에 저장된다
4. AIService가 OpenAI API를 호출하여 12주 학습 계획을 생성한다
5. 생성된 스케줄이 Database에 저장되고 사용자는 대시보드로 이동한다

---

### 4.2 과제 완료 처리 Sequence Diagram
사용자    →  Dashboard  →  TaskService  →  ProgressService  →  Database
│             │               │                 │               │
│─ 체크박스 클릭 →│               │                 │               │
│             │─ 과제 완료 ──→│                 │               │
│             │               │─ 상태 토글 ─────→│               │
│             │               │                 │─ 업데이트 ───→│
│             │               │                 │←─ 완료 ───────│
│             │               │                 │               │
│             │               │─ 일일 완료 체크 ─→│               │
│             │               │                 │               │
│             │               │                 │─ 연속일수 계산 │
│             │               │                 │               │
│             │               │←─ 진행률 업데이트 ─│               │
│             │               │                 │               │
│             │←─ UI 업데이트 ──│                 │               │
│             │               │                 │               │
│← 화면 갱신 ────│               │                 │               │



**설명:**
1. 사용자가 과제 체크박스를 클릭한다
2. TaskService가 과제 완료 상태를 토글한다
3. ProgressService가 진행률과 연속 학습 일수를 업데이트한다
4. 변경사항이 Database에 저장된다
5. UI가 실시간으로 갱신된다

---

### 4.3 전체 스케줄 조회 Sequence Diagram
사용자    →  SchedulePage  →  ScheduleService  →  Database
│              │                   │               │
│─ 스케줄 조회 ─→│                   │               │
│              │─ 데이터 요청 ─────→│               │
│              │                   │─ 조회 ───────→│
│              │                   │←─ 12주 데이터 ─│
│              │                   │               │
│              │←─ 스케줄 반환 ─────│               │
│              │                   │               │
│← 12주 표시 ────│                   │               │
│              │                   │               │
│─ 과제 체크 ────→│                   │               │
│              │─ 완료 처리 ───────→│               │
│              │                   │─ 업데이트 ───→│
│              │                   │←─ 완료 ───────│
│              │←─ 동기화 완료 ─────│               │
│              │                   │               │
│← 화면 갱신 ────│                   │               │



**설명:**
1. 사용자가 스케줄 페이지를 조회한다
2. ScheduleService가 Database에서 12주 학습 데이터를 가져온다
3. 사용자가 스케줄 페이지에서도 과제를 완료 처리할 수 있다
4. 대시보드와 스케줄 페이지는 실시간으로 동기화된다

---

## 5. State machine diagram

### 5.1 클라이언트 State Machine Diagram
[초기 상태]
│
▼
┌─────────────┐
│ Onboarding  │ ← 학습 계획 재생성
└─────────────┘
│ 프로필 생성 완료
▼
┌─────────────┐
│AI Generating│
└─────────────┘
│ 생성 완료
▼
┌─────────────┐        과제 완료
│  Dashboard  │ ◄────────────────┐
└─────────────┘                  │
│                            │
│ 페이지 이동                 │
├────────────┬───────────────┤
│            │               │
▼            ▼               ▼
┌─────────┐  ┌─────────┐  ┌─────────┐
│Schedule │  │Progress │  │ Chatbot │
└─────────┘  └─────────┘  └─────────┘
│            │               │
│            │               │
└────────────┴───────────────┘
│
▼
┌─────────┐
│ Profile │
└─────────┘



**상태 설명:**

1. **Onboarding**: 
   - 초기 진입 상태
   - 7단계 질문 진행
   - 모든 질문 완료 시 AI Generating으로 전환

2. **AI Generating**:
   - AI 학습 계획 생성 중
   - 로딩 화면 표시
   - 생성 완료 시 Dashboard로 전환

3. **Dashboard**:
   - 메인 학습 화면
   - 오늘의 과제 표시
   - 과제 완료 처리 가능
   - 다른 페이지로 이동 가능

4. **Schedule**:
   - 12주 전체 스케줄 조회
   - 과제 완료 처리 가능

5. **Progress**:
   - 진행률 추적
   - 연속 학습 일수 확인

6. **Chatbot**:
   - AI 학습 상담
   - 대화 히스토리 유지

7. **Profile**:
   - 학습 프로필 조회
   - 학습 계획 재생성 (Onboarding으로 이동)

---

### 5.2 서버 State Machine Diagram
[서버 시작]
│
▼
┌──────────┐
│  Idle    │ ← 요청 처리 완료
└──────────┘
│ 클라이언트 요청
▼
┌──────────┐
│Processing│
└──────────┘
│
├─ 프로필 저장 요청 ──→ [DB Write] ──→ [Idle]
│
├─ 스케줄 생성 요청 ──→ [AI API Call] ──→ [DB Write] ──→ [Idle]
│
├─ 데이터 조회 요청 ──→ [DB Read] ──→ [Idle]
│
├─ 과제 완료 요청 ───→ [DB Update] ──→ [Idle]
│
└─ 에러 발생 ────────→ [Error Handling] ──→ [Idle]

[DB Write/Read/Update]
│
├─ 성공 ──→ Response 전송
│
└─ 실패 ──→ [Retry] ──→ [Error Response]



**상태 설명:**

1. **Idle**:
   - 요청 대기 상태
   - 새로운 요청 수신 시 Processing으로 전환

2. **Processing**:
   - 요청 처리 중
   - 요청 타입에 따라 다른 처리 경로 선택

3. **DB Write**:
   - 데이터베이스 쓰기 작업
   - 프로필, 스케줄 저장

4. **DB Read**:
   - 데이터베이스 읽기 작업
   - 스케줄, 진행률 조회

5. **DB Update**:
   - 데이터베이스 업데이트 작업
   - 과제 완료 상태 변경

6. **AI API Call**:
   - OpenAI API 호출
   - 학습 계획 생성
   - Retry 로직 포함 (최대 3회)

7. **Error Handling**:
   - 에러 로깅
   - 클라이언트에 에러 응답 전송
   - Idle 상태로 복귀

---

## 6. User interface prototype

본 섹션에서는 LangPath 서비스의 주요 화면에 대한 UI 명세를 제시한다. 각 화면의 구성 요소, 배치, 인터랙션을 상세히 기술한다.

---

### 6.1 온보딩 화면 (1/7 단계 - 언어 선택)

**화면 설명:**  
사용자가 학습하고자 하는 외국어를 선택하는 첫 번째 온보딩 화면이다.

#### 화면 구성

**상단 영역:**
- 좌측: "LangPath" 로고 텍스트 (폰트 크기: 20px, 색상: #3B82F6)
- 우측: 닫기 버튼 "X" (아이콘, 크기: 24px)

**중앙 영역:**
- 타이틀: "🌍 학습할 언어를 선택하세요" (폰트 크기: 24px, 중앙 정렬)
- 언어 선택 버튼 6개 (2행 3열 그리드 배치):
  - 1행: 일본어 🇯🇵, 영어 🇺🇸, 중국어 🇨🇳
  - 2행: 스페인어 🇪🇸, 프랑스어 🇫🇷, 기타 ✏️
  - 각 버튼 크기: 100px x 100px
  - 버튼 간격: 가로 16px, 세로 16px
  - 기본 상태: 흰색 배경, 회색 테두리 (#E5E7EB)
  - 선택 상태: 흰색 배경, 파란색 테두리 (#3B82F6, 2px)

**진행률 표시:**
- 텍스트: "1 / 7" (중앙 정렬)
- 프로그레스 바: 14.3% (파란색 #3B82F6)

**하단 영역:**
- 좌측: "이전" 버튼 (비활성화 상태, 회색 #9CA3AF)
- 우측: "다음" 버튼 (언어 미선택 시 비활성, 선택 시 파란색 #3B82F6)
- 버튼 크기: 120px x 48px

#### 인터랙션

1. 사용자가 언어 버튼을 클릭하면 해당 버튼이 선택 상태로 변경된다.
2. 다른 언어 버튼 클릭 시 이전 선택이 해제되고 새로운 선택이 활성화된다.
3. 언어 선택 완료 시 "다음" 버튼이 활성화된다.
4. "다음" 버튼 클릭 시 2단계 화면으로 전환된다.
5. 1단계에서는 "이전" 버튼이 비활성화 상태로 유지된다.

---

### 6.2 온보딩 화면 (2/7 단계 - 현재 수준)

**화면 설명:**  
사용자의 현재 언어 수준을 선택하는 두 번째 온보딩 화면이다.

#### 화면 구성

**상단 영역:**
- 동일 (LangPath 로고, 닫기 버튼)

**중앙 영역:**
- 타이틀: "📚 현재 수준을 선택하세요" (폰트 크기: 24px)
- 수준 선택 버튼 4개 (세로 나열):
  - "완전 초보"
  - "기본 문자 읽기 가능"
  - "간단한 회화 가능"
  - "중급 (시험 준비 중)"
  - 각 버튼 크기: 320px x 60px
  - 버튼 간격: 12px
  - 스타일: 온보딩 1단계와 동일

**진행률 표시:**
- 텍스트: "2 / 7"
- 프로그레스 바: 28.6%

**하단 영역:**
- 좌측: "이전" 버튼 (활성화, 파란색)
- 우측: "다음" 버튼 (수준 미선택 시 비활성)

#### 인터랙션

1. 수준 버튼 클릭 시 선택 상태로 변경된다.
2. "이전" 버튼 클릭 시 1단계 화면으로 돌아간다 (이전 선택 유지).
3. "다음" 버튼 클릭 시 3단계 화면으로 전환된다.

---

### 6.3 대시보드 (메인 화면)

**화면 설명:**  
학습 계획 생성 완료 후 사용자가 일일 학습을 수행하는 메인 화면이다.

#### 화면 구성

**상단 헤더:**
- 좌측: "LangPath" 로고
- 중앙: 연속 학습 일수 "🔥 0일" (폰트 크기: 18px, 볼드)
- 우측: 프로필 아이콘 👤 (크기: 32px, 클릭 시 프로필 페이지 이동)

**메인 컨텐츠 영역:**

**섹션 1: 오늘의 학습**
- 헤더: "📅 오늘의 학습 - 1주차 / 12주" (폰트 크기: 20px, 볼드)
- 구분선 (회색, 1px)
- 과제 카드 리스트 (각 과제는 카드 형태):
  
  **과제 카드 1:**
  - 체크박스 (좌측, 크기: 24px)
  - 과제 제목: "히라가나 あ행 익히기" (폰트 크기: 16px, 볼드)
  - 상세 내용 (들여쓰기, 폰트 크기: 14px):
    - "• あ、い、う、え、お 읽고 쓰기"
    - "• 각 글자 10번씩 연습"
  - 소요 시간: "⏱️ 30분" (회색 텍스트)
  - 카드 배경: 흰색, 테두리: 회색 1px, 패딩: 16px
  
  **과제 카드 2:**
  - 동일 구조
  - 제목: "기본 인사말 익히기"
  - 상세: "おはよう、こんにちは", "발음 연습 5회"
  - 소요: "⏱️ 20분"

- 완료 카운트: "완료: 0/2" (우측 정렬, 회색)

**섹션 2: 이번 주 진행률**
- 헤더: "📊 이번 주 진행률" (폰트 크기: 18px, 볼드)
- 프로그레스 바:
  - 전체 길이: 100%
  - 현재 진행: 0% (파란색)
  - 높이: 8px
  - 모서리: 둥글게 (border-radius: 4px)
- 주간 캘린더:
  - 요일 표시: "월 화 수 목 금 토 일" (각 요일 중앙 정렬)
  - 완료 상태 표시: 원형 인디케이터
    - 완료: 파란색 원 ● (크기: 32px)
    - 미완료: 회색 원 ○ (크기: 32px)
  - 7개의 원이 가로로 나열 (간격: 8px)

**하단 네비게이션 바:**
- 5개 탭 (균등 분할):
  - 오늘 (홈 아이콘)
  - 스케줄 (캘린더 아이콘)
  - 챗봇 (채팅 아이콘)
  - 진행률 (차트 아이콘)
  - 프로필 (사람 아이콘)
- 현재 탭: 파란색 (#3B82F6)
- 비활성 탭: 회색 (#9CA3AF)
- 각 탭 크기: 20% 너비, 64px 높이
- 아이콘 크기: 24px
- 레이블 폰트 크기: 12px

#### 인터랙션

1. **체크박스 클릭:**
   - 과제 완료 상태 토글 (완료 ↔ 미완료)
   - 완료 시: 제목과 내용에 줄 그어짐 효과, 텍스트 회색으로 변경
   - 완료 카운트 실시간 업데이트 (예: 0/2 → 1/2)
   - 주간 캘린더에서 오늘 날짜 원이 파란색으로 변경
   - 연속 학습 일수 업데이트

2. **모든 과제 완료:**
   - 화면 상단에 "오늘도 화이팅! 🎉" 메시지 3초간 표시
   - 프로그레스 바 업데이트

3. **네비게이션 탭 클릭:**
   - 해당 페이지로 화면 전환
   - 부드러운 페이드 애니메이션 (300ms)

---

### 6.4 전체 스케줄 화면

**화면 설명:**  
12주간의 전체 학습 계획을 월별, 주차별로 조회하는 화면이다.

#### 화면 구성

**상단 헤더:**
- 좌측: "LangPath" 로고
- 중앙: "📅 전체 스케줄" 타이틀 (폰트 크기: 20px, 볼드)
- 우측: 프로필 아이콘

**메인 컨텐츠 영역:**

**월별 아코디언 구조:**

**1개월차 섹션:**
- 헤더:
  - 펼침/접힘 아이콘: ▼ (펼쳐짐) / ▶ (접힘)
  - 타이틀: "1개월차: 일본어 기초 다지기" (폰트 크기: 18px, 볼드)
  - 배경색: 연한 파란색 (#EFF6FF)
  - 패딩: 16px

- 내용 (펼쳐진 상태):
  
  **1주차 아코디언:**
  - 헤더:
    - 아이콘: ▶ (접힘 기본)
    - "1주차: 히라가나 마스터하기"
    - 부제: "주간 목표: 히라가나 50음 완벽 습득" (회색, 작은 글씨)
  - 클릭 시 일일 과제 목록 표시 (대시보드와 동일한 과제 카드 구조)
  
  **2주차 아코디언:**
  - "2주차: 가타카나 학습"
  - "주간 목표: 가타카나 기본 읽기"
  
  **3주차 아코디언:**
  - "3주차: 기본 문법 (1)"
  - "주간 목표: です/ます 문형 익히기"
  
  **4주차 아코디언:**
  - "4주차: 기본 문법 (2)"
  - "주간 목표: 조사 は/を/が 이해"

**2개월차 섹션:**
- 헤더: "2개월차: 일상 회화 기본" (동일 스타일)
- 5주차 ~ 8주차 (접힌 상태)

**3개월차 섹션:**
- 헤더: "3개월차: 회화 심화 및 종합" (동일 스타일)
- 9주차 ~ 12주차 (접힌 상태)

**하단 네비게이션 바:**
- 동일 (스케줄 탭 활성화)

#### 인터랙션

1. **월 헤더 클릭:**
   - 해당 월의 주차 목록 펼침/접힘 토글
   - 아이콘 변경 (▼ ↔ ▶)
   - 부드러운 슬라이드 애니메이션 (200ms)

2. **주차 헤더 클릭:**
   - 해당 주의 일일 과제 목록 펼침/접힘
   - 과제 카드는 대시보드와 동일한 형태
   - 체크박스 기능 동일하게 작동

3. **과제 완료:**
   - 대시보드와 실시간 동기화
   - 완료 상태 즉시 반영

---

### 6.5 진행률 화면

**화면 설명:**  
전체 학습 진행률, 연속 학습 일수, 업적 등을 확인하는 화면이다.

#### 화면 구성

**상단 헤더:**
- 좌측: "LangPath" 로고
- 중앙: "📊 진행률" 타이틀
- 우측: 프로필 아이콘

**메인 컨텐츠 영역:**

**섹션 1: 전체 진행률**
- 타이틀: "🎯 전체 진행률" (폰트 크기: 20px, 볼드)
- 구분선
- 원형 진행률 그래프:
  - 중앙: "0%" (큰 숫자, 폰트 크기: 48px)
  - 원형 게이지: 파란색, 두께: 12px, 지름: 200px
  - 그래프 하단: "1 / 12주" 텍스트

**현재 주차 진행률:**
- 타이틀: "현재 주차 진행률"
- 프로그레스 바: 대시보드와 동일 스타일
- 우측: "0%" 퍼센트 표시

**통계 카드 (2열 그리드):**
- 카드 1:
  - 아이콘: 🔥
  - 레이블: "연속 학습"
  - 값: "0일" (큰 숫자)
- 카드 2:
  - 아이콘: ✅
  - 레이블: "완료 과제"
  - 값: "0개"
- 카드 배경: 흰색, 테두리: 회색, 패딩: 16px

**섹션 2: 이번 주 완료 현황**
- 타이틀: "📅 이번 주 완료 현황" (구분선 포함)
- 주간 캘린더 (대시보드와 동일):
  - 요일: 월 화 수 목 금 토 일
  - 상태: ○ ○ ○ ○ ○ ○ ○
- 완료 카운트: "0 / 7일" (우측 정렬)

**섹션 3: 업적**
- 타이틀: "🏆 업적" (구분선 포함)
- 업적 카드 리스트 (세로 나열):
  
  **업적 카드 1:**
  - 아이콘: ⭐ (회색, 미달성)
  - 이름: "첫 학습 완료"
  - 설명: "첫 번째 학습 과제 완료하기"
  - 상태: "미달성" (회색 텍스트)
  
  **업적 카드 2:**
  - 아이콘: 🔥 (회색)
  - 이름: "3일 연속"
  - 설명: "3일 연속 학습 완료하기"
  - 상태: "미달성"
  
  **업적 카드 3:**
  - 아이콘: 📚 (회색)
  - 이름: "일주일 완주"
  - 설명: "일주일 동안 매일 학습하기"
  - 상태: "미달성"
  
  **업적 카드 4:**
  - 아이콘: 🎯 (회색)
  - 이름: "한 달 달성"
  - 설명: "1개월차 학습 완료하기"
  - 상태: "미달성"

- 달성 시 아이콘과 텍스트가 파란색으로 변경

**하단 네비게이션 바:**
- 동일 (진행률 탭 활성화)

#### 인터랙션

1. **실시간 업데이트:**
   - 대시보드/스케줄에서 과제 완료 시 모든 진행률 자동 업데이트
   - 원형 그래프, 프로그레스 바 애니메이션 (500ms)

2. **업적 달성:**
   - 조건 충족 시 화면 중앙에 "🎉 업적 달성!" 팝업 (3초간 표시)
   - 해당 업적 카드 색상 변경 애니메이션

---

### 6.6 AI 챗봇 화면

**화면 설명:**  
학습 관련 질문에 AI가 답변해주는 상담 화면이다.

#### 화면 구성

**상단 헤더:**
- 좌측: "LangPath" 로고
- 중앙: "💬 학습 상담" 타이틀
- 우측: 프로필 아이콘

**메인 컨텐츠 영역:**

**초기 화면 (대화 이력 없을 때):**
- 인사 메시지:
  - 아이콘: 🤖
  - 텍스트: "안녕하세요! 일본어 학습 어시스턴트입니다. 무엇을 도와드릴까요?"
  - 말풍선 스타일: 흰색 배경, 회색 테두리, 좌측 정렬

- 샘플 질문 카드 (3개):
  - "💡 샘플 질문:" (볼드)
  - 버튼 1: "히라가나를 빨리 외우는 방법은?"
  - 버튼 2: "JLPT N5 준비 팁 알려주세요"
  - 버튼 3: "오늘 학습이 너무 어려워요"
  - 버튼 스타일: 흰색 배경, 파란색 테두리, 패딩: 12px

**대화 영역 (메시지 입력 후):**
- 스크롤 가능한 메시지 리스트
- 사용자 메시지:
  - 우측 정렬
  - 파란색 말풍선 (#3B82F6)
  - 흰색 텍스트
  - 최대 너비: 70%
- AI 응답 메시지:
  - 좌측 정렬
  - 흰색 말풍선, 회색 테두리
  - 검은색 텍스트
  - 최대 너비: 80%
- 로딩 중 표시:
  - 좌측 정렬
  - "..." 애니메이션

**하단 입력 영역:**
- 텍스트 입력창:
  - Placeholder: "메시지 입력..."
  - 배경: 흰색
  - 테두리: 회색 1px
  - 높이: 48px
  - 최대 글자 수: 500자
- 전송 버튼:
  - 우측 배치
  - 아이콘: ➤ (종이비행기)
  - 크기: 48px x 48px
  - 배경: 파란색 (메시지 입력 시), 회색 (빈 입력창)

**하단 네비게이션 바:**
- 동일 (챗봇 탭 활성화)

#### 인터랙션

1. **샘플 질문 버튼 클릭:**
   - 해당 질문이 입력창에 자동 입력됨
   - 전송 버튼 활성화

2. **메시지 전송:**
   - 사용자 메시지가 우측에 표시됨
   - 입력창 초기화
   - AI 응답 로딩 애니메이션 표시 ("..." 3개가 위아래로 움직임)
   - 응답 도착 시 좌측에 말풍선으로 표시
   - 자동 스크롤 (최신 메시지가 보이도록)

3. **입력창 상태:**
   - 빈 입력창: 전송 버튼 비활성 (회색)
   - 텍스트 입력 시: 전송 버튼 활성 (파란색)
   - 500자 초과 시: 하단에 "최대 500자까지 입력 가능합니다" 경고 표시

4. **에러 처리:**
   - API 에러 발생 시: "죄송합니다, 다시 시도해주세요" 메시지 표시 (빨간색 말풍선)

---

### 6.7 프로필 화면

**화면 설명:**  
사용자의 학습 프로필 정보를 조회하고 학습 계획을 재생성할 수 있는 화면이다.

#### 화면 구성

**상단 헤더:**
- 좌측: "LangPath" 로고
- 중앙: "👤 내 프로필" 타이틀
- 우측: (빈 공간)

**메인 컨텐츠 영역:**

**섹션 1: 학습 정보**
- 타이틀: "📚 학습 정보" (폰트 크기: 20px, 볼드)
- 구분선

**정보 테이블 (2열 구조):**
- 각 행:
  - 좌측 (레이블): 회색, 폰트 크기: 14px
  - 우측 (값): 검은색, 폰트 크기: 16px
  - 행 높이: 48px
  - 구분선: 연한 회색 1px

- 행 1: "학습 언어" | "🇯🇵 일본어"
- 행 2: "현재 수준" | "완전 초보"
- 행 3: "학습 목표" | "시험 합격 (JLPT N3)"
- 행 4: "목표 기간" | "6개월"
- 행 5: "일일 학습" | "1시간"
- 행 6: "학습 방식" | "문법 중심 (체계적)"
- 행 7: "약점" | "읽기"
- 행 8: "시작일" | "2025.11.07"

**섹션 2: 학습 계획 재생성**
- 구분선
- 버튼: "학습 계획 재생성"
  - 크기: 전체 너비, 높이 56px
  - 배경: 빨간색 (#EF4444)
  - 텍스트: 흰색, 폰트 크기: 16px, 볼드
  - 아이콘: 🔄
- 경고 메시지:
  - 아이콘: ⚠️
  - 텍스트: "주의: 재생성 시 현재 진행률이 초기화됩니다."
  - 색상: 빨간색
  - 배경: 연한 빨간색 (#FEE2E2)
  - 패딩: 12px
  - 모서리: 둥글게

**하단 네비게이션 바:**
- 동일 (프로필 탭 활성화)

#### 인터랙션

1. **학습 계획 재생성 버튼 클릭:**
   - 확인 다이얼로그 표시:
     - 제목: "정말 재생성하시겠습니까?"
     - 내용: "현재까지의 모든 학습 진행률이 삭제되고 처음부터 다시 시작됩니다."
     - 버튼 2개:
       - "취소" (회색)
       - "재생성" (빨간색)

2. **재생성 확인:**
   - 모든 진행률 데이터 삭제
   - 온보딩 1단계 화면으로 이동
   - 이전 프로필 정보는 유지 (수정 가능)

3. **취소:**
   - 다이얼로그 닫힘
   - 현재 화면 유지

---

### 6.8 반응형 디자인 (모바일/데스크톱)

#### 모바일 (320px ~ 767px)

**레이아웃 특징:**
- 하단 네비게이션 바 사용
- 네비게이션 바 높이: 64px
- 메인 컨텐츠 하단 패딩: 80px (네비게이션 바 공간 확보)
- 좌우 패딩: 16px
- 카드/버튼: 전체 너비 사용

**온보딩 화면 조정:**
- 언어 버튼: 2열 3행 유지
- 버튼 크기: 80px x 80px (축소)
- 간격: 12px

**대시보드 조정:**
- 과제 카드: 세로 나열
- 주간 캘린더 원: 24px (축소)

#### 데스크톱 (1024px 이상)

**레이아웃 특징:**
- 상단 네비게이션 바 사용 (가로 배치)
- 네비게이션 바 높이: 64px
- 메인 컨텐츠 최대 너비: 1200px (중앙 정렬)
- 좌우 패딩: 24px

**대시보드 조정:**
- 과제 카드: 최대 2열 그리드 가능
- 주간 캘린더: 더 넓은 간격 (16px)

**진행률 화면 조정:**
- 통계 카드: 4열 그리드 (모바일 2열)
- 업적 카드: 2열 그리드 (모바일 1열)

---

### 6.9 공통 디자인 스펙

#### 색상 팔레트

**Primary 색상:**
- 메인 파란색: #3B82F6
- 호버 파란색: #2563EB
- 연한 파란색: #EFF6FF

**Secondary 색상:**
- 회색 텍스트: #6B7280
- 연한 회색: #F3F4F6
- 테두리 회색: #E5E7EB

**Accent 색상:**
- 빨간색 (경고): #EF4444
- 초록색 (성공): #10B981
- 주황색: #F59E0B

#### 타이포그래피

**폰트 패밀리:**
- 한글: "Pretendard", -apple-system, sans-serif
- 영문/숫자: "Inter", sans-serif

**폰트 크기:**
- 큰 제목: 24px (1.5rem)
- 중간 제목: 20px (1.25rem)
- 소제목: 18px (1.125rem)
- 본문: 16px (1rem)
- 작은 텍스트: 14px (0.875rem)
- 캡션: 12px (0.75rem)

**폰트 굵기:**
- Bold: 700 (제목, 강조)
- SemiBold: 600 (부제목)
- Regular: 400 (본문)

#### 간격 시스템

**패딩/마진:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

#### 모서리

**Border Radius:**
- 버튼: 8px
- 카드: 12px
- 입력창: 8px
- 모달: 16px

#### 애니메이션

**전환 시간:**
- 빠름: 150ms
- 보통: 300ms
- 느림: 500ms

**이징:**
- ease-in-out (기본)
- ease-out (페이드 인)

---

## 7. Implementation requirements

### 7.1 개발 환경

**Frontend:**
- React 18.3
- TypeScript 5.x
- Vite 5.x (빌드 도구)
- Tailwind CSS 3.x
- Shadcn UI (컴포넌트 라이브러리)

**Backend:**
- Node.js 18.x 이상
- Express.js 4.x
- RESTful API 설계

**Database:**
- In-memory storage (localStorage)
- Server-side storage (JSON 파일 또는 간단한 DB)

**AI Integration:**
- OpenAI GPT-4 API
- Replit AI Integrations

**State Management:**
- TanStack Query (React Query) 5.x

**Routing:**
- Wouter 3.x

### 7.2 시스템 요구사항

**클라이언트:**
- 모던 웹 브라우저 (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- JavaScript 활성화 필수
- localStorage 지원 필수
- 최소 화면 해상도: 320px (모바일)

**서버:**
- Node.js 실행 환경
- 최소 512MB RAM
- 최소 1GB 저장 공간
- 인터넷 연결 (OpenAI API 통신)

### 7.3 배포 환경

**플랫폼:**
- Replit (개발 및 호스팅)
- 도메인: replit.app 서브도메인
- 포트: 5000

**환경 변수:**
OPENAI_API_KEY=<OpenAI API 키>
OPENAI_BASE_URL=<OpenAI API 엔드포인트>
NODE_ENV=production
PORT=5000



### 7.4 성능 요구사항

- 페이지 로드 시간: 2초 이내
- AI 스케줄 생성 시간: 30초 이내
- 과제 완료 저장: 즉시 (500ms 이내)
- API 응답 시간: 2초 이내

### 7.5 보안 요구사항

- API 키 환경변수 관리 (코드에 하드코딩 금지)
- HTTPS 통신
- 사용자 데이터 로컬 저장 (개인정보 최소화)
- XSS, CSRF 방어

### 7.6 호환성 요구사항

**브라우저:**
- Chrome/Edge: 최신 버전 -2
- Firefox: 최신 버전 -2
- Safari: 최신 버전 -2
- 모바일 브라우저 지원

**디바이스:**
- 데스크톱 (1024px 이상)
- 태블릿 (768px - 1023px)
- 모바일 (320px - 767px)

---

## 8. Glossary

| 용어 | 설명 |
|-----|------|
| AI 학습 계획 | OpenAI GPT-4를 활용하여 사용자 프로필 기반으로 생성된 12주간의 맞춤형 학습 로드맵 |
| 온보딩 | 사용자가 처음 서비스를 이용할 때 7단계 질문을 통해 학습 프로필을 수집하는 과정 |
| 학습 프로필 | 사용자의 학습 언어, 수준, 목표, 기간, 일일 학습 시간, 학습 방식, 약점 정보를 담은 데이터 |
| 일일 과제 | 각 날짜에 할당된 학습 과제 목록 (제목, 상세 내용, 예상 소요 시간 포함) |
| 연속 학습 일수 | 학습을 빠짐없이 연속으로 완료한 날짜 수 (Streak) |
| 주간 목표 | 각 주차별로 설정된 학습 목표 (예: "히라가나 마스터하기") |
| localStorage | 브라우저에 데이터를 저장하는 웹 스토리지 API |
| TanStack Query | React에서 서버 상태 관리를 위한 라이브러리 (이전 React Query) |
| Wouter | 경량 React 라우팅 라이브러리 |
| Shadcn UI | Tailwind CSS 기반의 재사용 가능한 UI 컴포넌트 라이브러리 |
| Mock 데이터 | AI API 실패 시 제공되는 개발용 샘플 학습 계획 데이터 |
| Retry 로직 | API 호출 실패 시 자동으로 재시도하는 로직 (최대 3회) |
| 업적 시스템 | 학습 성취를 시각화하는 기능 (첫 학습 완료, 3일 연속, 일주일 완주 등) |
| 반응형 디자인 | 다양한 화면 크기에 자동으로 적응하는 웹 디자인 |
| RESTful API | REST 아키텍처 스타일을 따르는 웹 API |

---

## 9. References

### 9.1 기술 문서

1. **OpenAI API Documentation**
   - URL: https://platform.openai.com/docs
   - 사용: AI 학습 계획 생성 API 연동

2. **React Documentation**
   - URL: https://react.dev
   - 사용: React 18.3 기반 프론트엔드 개발

3. **TanStack Query Documentation**
   - URL: https://tanstack.com/query
   - 사용: 서버 상태 관리 및 데이터 fetching

4. **Tailwind CSS Documentation**
   - URL: https://tailwindcss.com/docs
   - 사용: 스타일링 및 반응형 디자인

5. **Shadcn UI Components**
   - URL: https://ui.shadcn.com
   - 사용: UI 컴포넌트 라이브러리

6. **Wouter Documentation**
   - URL: https://github.com/molefrog/wouter
   - 사용: 경량 라우팅 시스템

### 9.2 디자인 참고

1. **FitFlow 운동 앱**
   - 사용: 일일 과제 체크리스트 UI/UX 참고

2. **Duolingo**
   - 사용: 학습 진행률 시스템 및 연속 학습 일수(Streak) 개념 참고

3. **Habitica**
   - 사용: 업적 시스템 및 게이미피케이션 요소 참고

### 9.3 학술 자료

1. **UML 다이어그램 표기법**
   - 참고: Software Engineering course materials
   - 사용: Use case, Class, Sequence, State machine diagram 작성

2. **소프트웨어 설계 방법론**
   - 참고: 영남대학교 소프트웨어공학 강의자료
   - 사용: SDS 문서 구조 및 작성 방법

---

**문서 버전**: 1.0  
**최종 수정일**: 2025-11-07  
**작성자**: 정창화 (21821469)
