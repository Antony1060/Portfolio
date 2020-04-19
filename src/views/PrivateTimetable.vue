<template>
  <v-app id="timetable" class="mx-6">
    <h2 class="mt-4">Smjena Ujutro</h2>
    <table>
      <tr>
        <th>Dan</th>
        <th>PON</th>
        <th>UTO</th>
        <th>SRI</th>
        <th>ČET</th>
        <th>PET</th>
      </tr>
      <tr>
        <th>1.</th>
        <td align="center">Fiz</td>
        <td align="center">Tzk</td>
        <td align="center">Izb</td>
        <td align="center">Lat</td>
        <td align="center">Mat</td>
      </tr>
      <tr>
        <th>2.</th>
        <td align="center">Vjer/Etika</td>
        <td align="center">Lat</td>
        <td align="center">Izb</td>
        <td align="center">Glaz</td>
        <td align="center">Mat</td>
      </tr>
      <tr>
        <th>3.</th>
        <td align="center">Eng</td>
        <td align="center">Pov</td>
        <td align="center">Mat</td>
        <td align="center">Fiz</td>
        <td align="center">Hrv</td>
      </tr>
      <tr>
        <th>4.</th>
        <td align="center">Kem</td>
        <td align="center">Hrv</td>
        <td align="center">Mat</td>
        <td align="center">Fiz</td>
        <td align="center">Hrv</td>
      </tr>
      <tr>
        <th>5.</th>
        <td align="center">Kem</td>
        <td align="center">Hrv</td>
        <td align="center">Geo</td>
        <td align="center">Bio</td>
        <td align="center">Pov</td>
      </tr>
      <tr>
        <th>6.</th>
        <td align="center">Inf</td>
        <td align="center">Srz</td>
        <td align="center">Geo</td>
        <td align="center">Tzk</td>
        <td align="center">Eng</td>
      </tr>
      <tr>
        <th>6.</th>
        <td align="center">Inf</td>
        <td align="center"></td>
        <td align="center">Bio</td>
        <td align="center">Lik</td>
        <td align="center">Eng</td>
      </tr>
    </table>

    <h2 class="mt-6">Smjena Popodne</h2>
    <table>
      <tr>
        <th>Dan</th>
        <th>PON</th>
        <th>UTO</th>
        <th>SRI</th>
        <th>ČET</th>
        <th>PET</th>
      </tr>
      <tr>
        <th>1.</th>
        <td align="center">Mat</td>
        <td align="center">Pov</td>
        <td align="center">Hrv</td>
        <td align="center">Fiz</td>
        <td align="center">Kem</td>
      </tr>
      <tr>
        <th>2.</th>
        <td align="center">Mat</td>
        <td align="center">Fiz</td>
        <td align="center">Hrv</td>
        <td align="center">Pov</td>
        <td align="center">Kem</td>
      </tr>
      <tr>
        <th>3.</th>
        <td align="center">Lat</td>
        <td align="center">Fiz</td>
        <td align="center">Lat</td>
        <td align="center">Tzk</td>
        <td align="center">Glaz</td>
      </tr>
      <tr>
        <th>4.</th>
        <td align="center">Hrv</td>
        <td align="center">Eng</td>
        <td align="center">Inf</td>
        <td align="center">Srz</td>
        <td align="center">Eng</td>
      </tr>
      <tr>
        <th>5.</th>
        <td align="center">Izb</td>
        <td align="center">Bio</td>
        <td align="center">Inf</td>
        <td align="center">Geo</td>
        <td align="center">Eng</td>
      </tr>
      <tr>
        <th>6.</th>
        <td align="center">Izb</td>
        <td align="center">Bio</td>
        <td align="center">Mat</td>
        <td align="center">Geo</td>
        <td align="center">Hrv</td>
      </tr>
      <tr>
        <th>6.</th>
        <td align="center">Vjer/Etika(0. sat)</td>
        <td align="center">Tzk</td>
        <td align="center">Mat</td>
        <td align="center">Lik</td>
        <td align="center"></td>
      </tr>
    </table>
  </v-app>
</template>

<script>
  export default {
      name: "PrivateTimetable"
  }
</script>

<style scoped>
  * {
    font-family: Arial, Helvetica, sans-serif;
  }

  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }

  th, td {
    height: 40px;
    width: 80px;
  }
</style>