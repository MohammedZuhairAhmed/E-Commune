const About = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "centre",
        height: "100vh",
        backgroundImage:
          "url('https://img.freepik.com/premium-vector/abstract-red-wavy-business-style-background_573652-299.jpg?w=1060')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          textAlign: "center  ",
        }}
      >
        About Us
      </h1>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: 100,
            width: "10%",
            height: "20%",
            backgroundImage:
              "url('https://previews.dropbox.com/p/thumb/AB5SAnoqfiSS4enVDUvWHyid86D5p_s-hMUWv__MgDg2CA5W7RgebInKbvXlI4JHVq4oBbfZiRuZmsFkQ7mG-hLAzq46QDSdDFY93v26IQ7Ytfonou-dhchPoWskey_uHk7ZTLQRpgQ-RU6RY7ykh4OdB4KPdYkAnT3hOjNT0mC4V4gE35sxNcGdt6od0AnquDbJzqELtK8kOQ7iqI4YE-qOeXa3Wd4_AEJylppfoOktH7Dlux7y1YIpfs1EYvDtsKq1gdc4FPdy4iJd0GBF4lYPDiug1_V7NjL13MNXwNf4egwXLNIBsjl25n1rig2XP6SzHlTt7E9RnrFDq-ywNjqzDHn5lq3IqJQ1aoeFAwDF4Mzwf6l3HmeTK5DmWzGUARU/p.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left",
            backgroundSize: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 150,
            right: 0,
            left: 1200,
            width: "15%",
            height: "20%",
            backgroundImage:
              "url('https://previews.dropbox.com/p/thumb/AB6OpqPjC_6mF8VBe587JaXRQ80ed9MdW0yIj8GzmPYjnaL-PnZr_eYSZ9ipnPr7geHdNfJQLtXluQ4CcZLSD3I3VEvJ4yXv7INkMYY7cuIlg_0sBoE0JGaINz-AB-QyvLOEISfkTLQzJWtUoaTItCdLy22lJgJYUBo-Oyt73L5-Ib_-WxL3DjLtdlckuor3sRVYUvz0uQ7g9tPTFM4VRsCvRg3gHn2GA3OLorh79DgEpMYuBTC88Is49cLyQ2pbQ4gUsxcpk28DxpAQGf2cZlHjoBhkl8J5RAdz0lLhzMVfw15cf0bIf1SwOtdzIEtLL5YA-sBe_oT4FkesE32LgxzMVscXjy-3xZ96i-kDC1z8noJnYBZYpb_9R3JPSuaGDW4/p.jpeg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            backgroundSize: "cover",
          }}
        />
        <p
          style={{
            marginLeft: "23rem",
            marginRight: "23rem",
            fontSize: "1.5rem",
            fontWeight: "450",
          }}
        >
          Sustainable commute programs are becoming increasingly important as
          the world faces the challenges of climate change and air pollution.
          These programs aim to reduce the environmental impact of commuting by
          encouraging employees to use more sustainable transportation options.
          Employers can play a significant role in promoting sustainable
          commuting by offering incentives and providing access to sustainable
          transportation options.
        </p>
        <p
          style={{
            marginLeft: "23rem",
            marginRight: "23rem",
            fontSize: "1.5rem",
            marginTop: "2rem",
            fontWeight: "450",
          }}
        >
          These programs can take many forms, such as carpooling, public
          transportation, biking, or walking, and employers can incentivize
          employees to participate in the program by offering rewards or
          benefits. Employers can also provide resources and support, such as
          providing secure bike storage or offering discounted public
          transportation passes.
        </p>
        <p
          style={{
            marginLeft: "23rem",
            marginRight: "23rem",
            fontSize: "1.5rem",
            marginTop: "2rem",
            fontWeight: "450",
          }}
        >
          A key component of a sustainable commute program is the use of a
          platform to manage the program and provide employees with the
          necessary information and resources to make sustainable commuting
          choices. This platform can also provide employers with data and
          feedback on the effectiveness of the program.
        </p>
      </div>
    </div>
  );
};

export default About;
