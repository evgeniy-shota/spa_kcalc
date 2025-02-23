<script setup></script>

<template>
    <div class="card border-light" style="height: 100%;">
        <div class="card-body">
            <div class="mb-2">
                <label for="userName" class="form-label mb-1">Логин</label>
                <input type="text" name="userName" id="userName" class="form-control">
            </div>
            <div class="mb-2">
                <label for="userEmail" class="form-label mb-1">Почта</label>
                <input type="email" name="userEmail" id="userEmail" class="form-control">
            </div>
            <div class="mb-2">
                <label for="userGender" class="form-label mb-1">Пол</label>
                <select name="userGender" id="userGender" class="form-select">
                    <option value="man">Мужской</option>
                    <option value="woman">Женкий</option>
                    <option selected value="unknow">Не указан</option>
                </select>
            </div>
            <div class="mb-2">
                <label for="userDateOfBirth" class="form-label mb-1">Дата рождения</label>
                <input type="date" name="userDateOfBirth" id="userDateOfBirth" class="form-control">
            </div>
            <div class="mb-2">
                <label for="userTrainingLevel" class="form-label mb-1">Уровень тренированости</label>
                <select name="userTrainingLevel" id="userTrainingLevel" class="form-select">
                    <option value="low">Низкий</option>
                    <option select value="medium">Средний</option>
                    <option value="high">Высокий</option>
                    <option value="veryHigh">Очень высокий</option>
                </select>
            </div>
            <div class="mb-2">
                <label for="userActivityLevel" class="form-label mb-1">Уровень дневной активности</label>
                <select name="userActivityLevel" id="userActivityLevel" class="form-select">
                    <option value="low">Низкий</option>
                    <option select value="medium">Средний</option>
                    <option value="high">Высокий</option>
                    <option value="veryHigh">Очень высокий</option>
                </select>
            </div>
            <div class="mb-2">
                <label for="userHeight" class="form-label mb-1">Рост</label>
                <input type="number" name="userHeight" id="userHeight" class="form-control">
            </div>
            <div class="d-flex justify-content-between">
                <div>
                    <div class="mb-2">
                        <label for="userWeight" class="form-label mb-1 me-1">Вес</label>
                        <div class="btn btn-sm btn-light">Обновить</div>
                        <input type="number" name="userWeight" id="userWeight" class="form-control">
                    </div>
                </div>
                <div>
                    <div class="mb-2">
                        <label for="userTargetWeight" class="form-label mb-1">Целевой вес</label>
                        <input type="number" name="userTargetWeight" id="userTargetWeight" class="form-control">
                    </div>
                </div>
            </div>
            <div>
                chartlist
            </div>
        </div>
    </div>
</template>

<style></style>